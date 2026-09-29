import express from "express"
const router = express.Router();
import {updateProfile , deleteProfilePic, updateUserInfo, searchUser} from "../controllers/users/users/user.controller.js";
import {protect} from "./../middlewares/auth.middleware.js"

router.route("/pic")
.patch(protect ,updateProfile)
.delete(protect ,deleteProfilePic)

router.route("/").patch(protect , updateUserInfo)
router.route("/").post(protect , searchUser)



export default router