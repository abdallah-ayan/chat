import express from "express"
import { addUsers, checkGroup, createGroup, deleteCroup, deleteMe, deleteProfile, deleteUser, getData, getGroups, isAdmin, update, updateProfile } from "../controllers/group/group.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
const router = express.Router();


router.route("/add/:id").post(protect , checkGroup ,isAdmin ,  addUsers)
router.route("/delete/me/:id").delete(protect , checkGroup , deleteMe)
router.route("/delete/:id").delete(protect , checkGroup ,isAdmin ,  deleteUser)

router.route("/pic/:id")
    .patch(protect , checkGroup ,isAdmin ,  updateProfile)
    .delete(protect , checkGroup ,isAdmin ,  deleteProfile)

    
router.route("/")
.get(protect ,  getGroups)
.post(protect ,  createGroup)

router.route("/:id")
.patch(protect , checkGroup ,isAdmin ,  update)
.delete(protect , checkGroup ,isAdmin ,  deleteCroup)
.get(protect ,checkGroup , getData)

export default router