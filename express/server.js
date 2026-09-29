import "dotenv/config"
import express from "express"
import mongoRun from "./src/lib/db.js"
import cookieParser from "cookie-parser";

import authRouter from "./src/routes/auth.route.js";
import userRouter from "./src/routes/users.route.js"
import messageRouter from "./src/routes/message.route.js"
import groupRouter from "./src/routes/group.route.js"

import errorController from "./src/controllers/error/error.controller.js"
import path from "path";
import CustomError from "./src/utils/customError.js";
import { arcjetProduction } from "./src/middlewares/arcjet.middleware.js";
import {app , server } from "./src/lib/socket.js"
import cors from "cors"
const dist_path = path.join(path.resolve() , "../react/dist");

app.use(cookieParser());
app.use(express.json({"limit" : "10mb"}));
// app.use(arcjetProduction)
app.use(cors({
    origin : process.env.CLIENT_URL ,
    credentials : true
}))

app.use("/api/auth" , authRouter);
app.use("/api/users" , userRouter);
app.use("/api/message" , messageRouter);
app.use("/api/group" , groupRouter);

if(process.env.NODE_NV == "production" ) {
    app.use(express.static(dist_path))
    app.get("/*splate" , (_ , res) => res.sendFile(path.join(dist_path , "/index.html")))
}
app.all("/*splate", (req, res, next) => {
    next(CustomError.getObject(`The route ${req.originalUrl} was not found`, 404))
})
app.use(errorController)
server.listen(process.env.PORT , ()=> {
    console.log("server connected ...")
    mongoRun();
});