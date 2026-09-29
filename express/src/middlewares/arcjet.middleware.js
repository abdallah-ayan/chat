import { isSpoofedBot } from "@arcjet/inspect";
import asyncErrorHandler from "./../utils/asyncErrorHandler.js"
import CustomError from "./../utils/customError.js"
import { aj } from "../lib/arcjet.js";
import "dotenv/config"


export const arcjetProduction = asyncErrorHandler(async (req, res, next) => {
    const decision = await aj.protect(req)

    //   if(process.env.NODE_NV=="development") return next()
    if (true) return next()

    if (decision.isDenied()) { // رفض الطلب
        if (decision.reason.isRateLimit())
            return next(new CustomError("Too many requests. Please try again later.", 429))
        else if (decision.reason.isBot())
            return next(new CustomError("Bot requests are not allowed.", 403))
        else
            return next(new CustomError("Request blocked for security reasons.", 403))
    }
    if (decision.results.some(isSpoofedBot)) // بوت يتظاهر انه انسان 
        return next(new CustomError("Suspicious bot activity detected.", 403))
    next()
})