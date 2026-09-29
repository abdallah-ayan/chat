import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../../../models/users.model.js"
import getToken from "../../../utils/token.js"
import util from "util"
import Res from "./../../../utils/Json.js"
import "dotenv/config"
import customError from "./../../../utils/customError.js"
import asyncErrorHandler from "../../../utils/asyncErrorHandler.js";
import sendEmail from "../../../utils/sendEmail.js";
import welcomeEmail from "../../../templates/welcom.js";
import bcrypt from "bcryptjs";




export const signUp = asyncErrorHandler( async (req , res , next) => {
    const { email, password , fullName } = req.body;
    if(!email || !password || !fullName) return next(customError.getObject("Full name, email, and password are required" , 400));
    const user = await User.create(req.body);
    await sendEmail({to : email , subject : "Welcome to MyChat 🎉" , html : welcomeEmail(user.fullName)})
    Res.getObject(res).status(201).message("User registered successfully").data(user).token(getToken({_id : user.id})).end();
})


export const login = asyncErrorHandler( async (req, res , next) => {
    const { email, password } = req.body;
    if(!email || !password) return next(customError.getObject("Email and password are required" , 400));

    const user = await User.findOne({ email: email }).select("+password");
    if(!user) return next(customError.getObject("No account found with this email" , 400)); 

    if(!await user.comparePassword(password)) return next(customError.getObject("Incorrect password" , 400));

    Res.getObject(res).status(200).message("User logged in successfully").data(user).token(getToken({_id : user.id})).end();
})


export const logout = asyncErrorHandler( async (_, res , __) => {
    Res.getObject(res).status(200).message("User logged out successfully").token("" , 0).end();
})




async function getGoogleUser(accessToken) {

    if (!accessToken) throw customError.getObject("Google access token is required",400);
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo",{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    if (!response.ok)throw customError.getObject( "Invalid Google access token",401);
    const googleUser = await response.json();
    if (!googleUser.email)throw customError.getObject( "Google account email not found",400);
    return googleUser;
}


export const googleLogin = asyncErrorHandler(
    async (req, res, next) => {
        const { accessToken } = req.body;
        const googleUser = await getGoogleUser(accessToken);
        const user = await User.findOne({
            email: googleUser.email 
        });

        if (!user) return next(customError.getObject("No account found with this Google account", 404));

        return Res.getObject(res).status(200)
            .message("User logged in successfully with Google")
            .data({ user }).token(getToken({ _id: user.id })).end();
    }
);


export const googleSignup = asyncErrorHandler(
    async (req, res, next) => {
        const { accessToken , password} = req.body;
        const googleUser = await getGoogleUser(accessToken);
        const existingUser = await User.findOne({
            email: googleUser.email
        });
        if (existingUser) return next(customError.getObject(   "An account with this email already exists",409));
        const newUser = await User.create({
            email: googleUser.email,
            fullName: googleUser.name,
            profilePic: googleUser.picture,
            authProvider: "google" ,
            password : password
        });
        return Res.getObject(res).status(201).message("Google account created successfully").data({user: newUser})
        .token(getToken({_id: newUser.id})).end();
    }
);