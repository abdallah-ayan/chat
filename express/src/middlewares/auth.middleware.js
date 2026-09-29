import jwt from "jsonwebtoken";
import util from "util"
import "dotenv/config"
import customError from "./../utils/customError.js"
import asyncErrorHandler from "./../utils/asyncErrorHandler.js";
import User from "../models/users.model.js";

export const protect = asyncErrorHandler( async (req, _, next) => {
    const verify = util.promisify(jwt.verify);
    const payload = await verify(req.cookies.token, process.env.TOKEN_KEY)
    const id = payload._id;
    const user = await User.findById(id).select("+profilePicPublicId");
    if (!user) return next(customError.getObject("User not found" , 401));
    req.user = user;
    next();
})