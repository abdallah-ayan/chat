import cloudinary from "../../lib/cloadinary.js";
import Group from "../../models/group.model.js";
import Message from "../../models/messages.model.js";
import User from "../../models/users.model.js";
import asyncErrorHandler from "../../utils/asyncErrorHandler.js";
import CustomError from "../../utils/customError.js";
import Res from "../../utils/Json.js";


export const checkGroup = asyncErrorHandler(async (req, res, next) => {
    const receiverId = req.params.id
    const group = await Group.findById(receiverId);
    if (group == null)
        req.isGroup = false;
    else {
        req.isGroup = true;
        req.group = group;
    }
    next()
})

export const auth = asyncErrorHandler(async (req, res, next) => {
    if (!req.isGroup) return next()
    const my = req.group.users.find((ele) => ele.id == req.user.id.toString())
    if (!my) return next(CustomError.getObject("You are not a member of this group", 400))
    if (!req.group.sendAll && my.role == "user")
        return next(CustomError.getObject("You are not allowed to send messages in this group", 400))
    next();
})

export const isAdmin = asyncErrorHandler(async (req, res, next) => {
    if (!req.isGroup)
        return next(CustomError.getObject("The group you are trying to access does not exist", 400))
    const my = req.group.users.find((ele) => ele.id == req.user.id.toString())
    if (!my) return next(CustomError.getObject("You are not a member of this group", 400))
    if (my.role == "user") return next(CustomError.getObject("Only admins can make this change", 400))
    next();
})


export const createGroup = asyncErrorHandler(async (req, res, next) => {
    let users = req?.body?.users ?? []
    users = [...new Set(users)];
    if (users.indexOf(req.user._id.toString()) != -1) users.splice(users.indexOf(req.user._id), 1);
    if (users.length < 2)
        return next(CustomError.getObject("A group must have at least 2 users", 400))
    users.push(req.user._id.toString())
    const ids = [...users]
    users = users.map((ele) => {
        return ele.toString() == req.user._id.toString() ? { id: ele, role: "admin" } : { id: ele }
    })
    const group = await Group.create({ users, name: req?.body?.name });
    await User.updateMany({ _id: { $in: ids } }, {
        $push: { groups: group._id.toString() }
    })
    Res.getObject(res).status(200).state("success").data({ group }).end()
});

export const updateProfile = asyncErrorHandler(async (req, res, next) => {
    const profilePic = req?.body?.profilePic;
    if (!profilePic) return next(CustomError.getObject("Profile picture is required", 400));
    if (!req?.params?.id) return next(CustomError.getObject("id of group is required", 400));
    const uploadResult = await cloudinary.uploader.upload(profilePic);
    const group = await Group.findByIdAndUpdate(req?.params?.id, { profilePic: uploadResult.secure_url, profilePicPublicId: uploadResult.public_id }, { returnDocument: "after" });
    Res.getObject(res).status(200).message("Your profile was updated successfully").data({ group }).end();
})

export const deleteProfile = asyncErrorHandler(async (req, res, next) => {
    if (!req?.params?.id) return next(CustomError.getObject("id of group is required", 400));
    const group = await Group.findById(req.params.id).select("+profilePicPublicId");
    if (group.profilePicPublicId == "")
        return next(CustomError.getObject("You don't have an image", 400))
    await cloudinary.uploader.destroy(group.profilePicPublicId);
    const newGroup = await Group.findByIdAndUpdate(req.params.id, {
        profilePic: "",
        profilePicPublicId: ""
    },{ returnDocument: "after" });
    Res.getObject(res).status(200).data({group : newGroup}).message("group image was deleted successfully").end();
})

export const update = asyncErrorHandler(async (req, res, next) => {
    const name = req.body?.name;
    const description = req.body?.description;
    const sendAll = req.body?.sendAll;
    
    if (!name && !description)
        return next(CustomError.getObject("Name or description is required", 400));
    const group_id = req.params.id;
    const group = await Group.findByIdAndUpdate(
        group_id,
        { name, description , sendAll},
        { returnDocument: "after" }
    )
    if (!group) return next(CustomError.getObject("Group not found", 404));
    Res.getObject(res).status(200).message("Group updated successfully").data({ group }).end();
});

export const addUsers = asyncErrorHandler(async (req, res, next) => {

    const group_id = req.params.id;
    const userIds = req?.body?.users ?? [];

    if (userIds.length === 0)
        return next(CustomError.getObject("Users are required", 400));

    const users = userIds.map(id => ({ id, role: "user" }));

    const group = await Group.findByIdAndUpdate(group_id, { $addToSet: { users: { $each: users } } }, { returnDocument: "after" });

    if (!group)
        return next(CustomError.getObject("Group not found", 404));

    await User.updateMany({ _id: { $in: userIds } }, { $addToSet: { groups: group_id } });

    Res.getObject(res).status(200).message("Users added to the group successfully").data({ group }).end();

});

export const deleteUser = asyncErrorHandler(async (req, res, next) => {

    const group_id = req.params.id;
    const userId = req?.body?.userId;

    const user = req.group.users.find((ele) => ele.id == userId?.toString())
    if (user == null) return next(CustomError.getObject("user not found !", 400))
    if (user?.role == "admin") return next(CustomError.getObject("you cant delete admin", 400))

    if (!userId)
        return next(CustomError.getObject("User id is required", 400));

    const group = await Group.findByIdAndUpdate(
        group_id,
        { $pull: { users: { id: userId } } },
        { returnDocument: "after" }
    );

    if (!group)
        return next(CustomError.getObject("Group not found", 404));

    await User.findByIdAndUpdate(
        userId,
        { $pull: { groups: group_id } }
    );

    Res.getObject(res)
        .status(200)
        .message("User removed from the group successfully")
        .data({ group })
        .end();

});

export const deleteMe = asyncErrorHandler(async (req, res, next) => {

    if (!req.isGroup)
        return next(CustomError.getObject("The group you are trying to access does not exist", 400))
    const group_id = req.params.id;
    const userId = req.user._id;

    const user = req.group.users.find((ele) => ele.id == userId?.toString())
    if (user?.role == "admin") return next(CustomError.getObject("You can't delete yourself because you're the admin.", 400))

    const group = await Group.findByIdAndUpdate(
        group_id,
        { $pull: { users: { id: userId } } },
        { returnDocument: "after" }
    );

    if (!group)
        return next(CustomError.getObject("Group not found", 404));

    await User.findByIdAndUpdate(
        userId,
        { $pull: { groups: group_id } }
    );

    Res.getObject(res)
        .status(200)
        .message("User removed from the group successfully")
        .data({ group })
        .end();

});

export const deleteCroup = asyncErrorHandler(async (req, res, next) => {

    if (!req.isGroup)
        return next(CustomError.getObject("The group you are trying to access does not exist", 400))
    const ids = req.group.users.map((user) => user.id.toString());

    await User.updateMany({ _id: { $in: ids } }, {
        $pull: { groups: req.group._id.toString() }
    })

    await Group.findByIdAndDelete(req.group._id.toString());

    Res.getObject(res)
        .status(200)
        .state("success")
        .message("Group removed successfully")
        .end();
});

export const getGroups = asyncErrorHandler(async (req, res, next) => {
    const ids = req.user.groups;
    const groups = await Group.find({ _id: { $in: ids } }).select("name profilePic sendAll description");
    Res.getObject(res)
        .status(200)
        .state("success")
        .data({ groups })
        .end();
});


export const getData = asyncErrorHandler(async (req, res, next) => {
    if (!req.isGroup)
        return next(CustomError.getObject("This is not group !", 400));
    const my = req.group.users.find((ele) => ele.id == req.user.id.toString())
    if (!my) return next(CustomError.getObject("You are not a member of this group", 400))

    const userIds = req.group.users.map((item) => item.id.toString());

    const users = await User.find({ _id: { $in: userIds } }); //
    const messages = await Message.find({ //
        receiverId: req.group._id.toString()
    })

    const ids = [...new Set(messages.map((msg) => msg.senderId.toString()))]
    const usersData = await User.find({ _id: { $in: ids } }).select("_id fullName profilePic"); //

    const finalMessage = messages.map((msg) => {
        const user = usersData.find(
            (user) => user._id.toString() === msg.senderId.toString()
        );

        return {
            ...msg.toObject(),
            senderName : user.fullName ,
            senderImage : user.profilePic
        };
    });

    Res.getObject(res).status(200).state("success").data({ users, messages: finalMessage, role: req.group.users }).end();
})