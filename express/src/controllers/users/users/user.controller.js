import cloudinary from "../../../lib/cloadinary.js";
import User from "../../../models/users.model.js";
import asyncErrorHandler from "../../../utils/asyncErrorHandler.js";
import CustomError from "../../../utils/customError.js";
import Res from "./../../../utils/Json.js"

export const updateProfile = asyncErrorHandler(async (req, res, next) => {
    const { profilePic } = req.body;
    if (!profilePic) return next(CustomError.getObject("Profile picture is required", 400));
    const uploadResult = await cloudinary.uploader.upload(profilePic);
    const user = await User.findByIdAndUpdate(req.user._id, { profilePic: uploadResult.secure_url, profilePicPublicId: uploadResult.public_id }, { new: true });
    Res.getObject(res).status(200).message("Your profile was updated successfully").data({ user }).end();
})


export const deleteProfilePic = asyncErrorHandler(async (req, res, next) => {
    if (req.user.profilePicPublicId == "")
        return Res.getObject(res).status(400).message("You don't have an image").end();
    await cloudinary.uploader.destroy(req.user.profilePicPublicId);
    const user = await User.findByIdAndUpdate(req.user._id, {
        profilePic: "",
        profilePicPublicId: ""
    } , {new : true});
    Res.getObject(res).status(200).message("Your profile was deleted successfully").data({user}).end();
})


export const updateUserInfo = asyncErrorHandler(async (req, res, next) => {

    const { fullName, searchName, description } = req.body;

    if (!fullName && !searchName && !description) {
        return next(
            CustomError.getObject("At least one field is required", 400)
        );
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            fullName,
            searchName,
            description
        },
        {
            new: true,
            runValidators: true
        }
    );

    Res.getObject(res)
        .status(200)
        .message("Your information was updated successfully")
        .data({ user })
        .end();
});

export const searchUser = asyncErrorHandler(async (req, res, next) => {

    const { searchName } = req.query;

    if (searchName == undefined)
        return next(
            CustomError.getObject("Search name is required", 400)
        );

    const filter = {
        _id: { $ne: req.user._id }
    };

    if (searchName?.trim()) {
        filter.searchName = {
            $regex: searchName.trim(),
            $options: "i"
        };
    }


    const users = await User.find(filter)
        .select("fullName searchName description profilePic");

    Res.getObject(res)
        .status(200)
        .message("Users found successfully")
        .data({ users })
        .end();
});