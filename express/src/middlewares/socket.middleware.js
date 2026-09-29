import util from "util"
import jwt from "jsonwebtoken"
import "dotenv/config"
import User from "../models/users.model.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customError.js";

const socketMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.headers.cookie.split(" ").filter(row => row.startsWith("token="))[0].split("=")[1] ?? ""
        const verify = util.promisify(jwt.verify);
        const payload = await verify(
            token,
            process.env.TOKEN_KEY
        );
        const id = payload._id;
        const user = await User
            .findById(id)
            .select("+profilePicPublicId");
        if (!user) {
            return next(CustomError.getObject("User not found", 401));
        }
        socket.user = user;
        socket.userId = id;
        next();
    } catch (error) {
        next(error);
    }
};

export default socketMiddleware