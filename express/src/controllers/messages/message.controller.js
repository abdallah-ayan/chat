import cloudinary from "../../lib/cloadinary.js";
import { getUserSokectId, getUsersOnline, io } from "../../lib/socket.js";
import Group from "../../models/group.model.js";
import Message from "../../models/messages.model.js";
import User from "../../models/users.model.js";
import asyncErrorHandler from "../../utils/asyncErrorHandler.js";
import CustomError from "../../utils/customError.js";
import Res from "../../utils/Json.js";

export const sendMessage = asyncErrorHandler(async (req, res, next) => {
    const senderId = req.user._id;
    const receiverId = req.params.id
    if (senderId.toString() == receiverId.toString())
        return next(CustomError.getObject("You cannot send a message to yourself", 400));
    let image = req?.body?.image;
    const text = req?.body?.text;
    if (image) {
        const result = await cloudinary.uploader.upload(image)
        image = result.secure_url
    }
    const message = await Message.create({ senderName: req.user.fullName, senderImage: req.user.profilePic, senderId, receiverId, image, text });
    if (req.isGroup) {
        const onlineUsers = getUsersOnline();
        const onlineMembers = req.group.users.map(user => user.id.toString())
         .filter(id => id !== senderId.toString() && onlineUsers.includes(id));
        await Group.findByIdAndUpdate(receiverId, { messages: [message._id.toString(), ...req.group.messages] })
        onlineMembers.forEach(id => {
            const socketId = getUserSokectId(id);

            if (socketId) {
                io.to(socketId).emit("newMessage", message);
            }
        });
    } else {
        const socketId = getUserSokectId(receiverId);
        if (socketId) io.to(socketId).emit("newMessage", message)
    }

    Res.getObject(res).status(201).message("Your message was sent successfully").data({ message }).end();
})

// 

export const getMessage = asyncErrorHandler(async (req, res, next) => {
    const myId = req.user._id;
    const otherId = req.params.id
    if (myId.toString() == otherId.toString())
        return next(CustomError.getObject("You cannot view a conversation with yourself", 400));
    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: otherId },
            { senderId: otherId, receiverId: myId },
        ]
    }).sort({ createdAt: 1 });
    Res.getObject(res).status(200).state("success").data({ messages }).end();
})

export const getMyChat = asyncErrorHandler(async (req, res, next) => {
    const id = req.user._id;
    const message = await Message.find({
        $or: [
            { senderId: id },
            { receiverId: id }
        ]
    }).select("senderId receiverId")
    const ids = [...new Set(message.map((msg) => msg.senderId.toString() == id.toString() ? msg.receiverId : msg.senderId))]
    const users = await User.find({ _id: { $in: ids } });
    Res.getObject(res).status(200).state("sucess").data({ users }).end();
})

export const concats = asyncErrorHandler(async (req, res, next) => {
    const id = req.user._id;
    const users = await User.find({ _id: { $ne: id } });
    Res.getObject(res).status(200).state("sucess").data({ users }).end();
}) 