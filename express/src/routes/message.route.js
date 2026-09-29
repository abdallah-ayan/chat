import express from "express"
import { protect } from "../middlewares/auth.middleware.js";
import { concats, getMessage, getMyChat, sendMessage } from "../controllers/messages/message.controller.js";
import { auth, checkGroup } from "../controllers/group/group.controller.js";
const router = express.Router();

router.route("/chat").get(protect , getMyChat);
router.route("/concat").get(protect , concats);

router.route("/:id")
.post(protect , checkGroup , auth , sendMessage)
.get(protect , getMessage)


export default router