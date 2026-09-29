import {Server} from "socket.io"
import http from "http"
import express from "express"
import socketMiddleware from "../middlewares/socket.middleware.js";
import { env } from "process";

const app = express();
const server = http.createServer(app );

const io = new Server(server , {
    cors : {
        origin : process.env.CLIENT_URL,
        credentials : true
    }
})

io.use(socketMiddleware);

const usersSocketMap = {};

export const getUserSokectId = (id) => {
    return usersSocketMap[id];
}

export const getUsersOnline = (id) => {
    return Object.keys(usersSocketMap);
}

io.on("connection" , (socket) => {
    usersSocketMap[socket.userId] = socket.id;
    io.emit("getOnline" , Object.keys(usersSocketMap));
    socket.on("discount" , ()=> {
        delete usersSocketMap[socket.userId]
        io.emit("getOnline" , Object.keys(usersSocketMap));
    })
});

export {io , app , server}