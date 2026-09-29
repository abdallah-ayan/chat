import express from "express"
const router = express.Router();
import { signUp , login , logout, googleLogin, googleSignup} from "../controllers/users/auth/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import Res from "../utils/Json.js";

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.post("/google/login", googleLogin);
router.post("/google/signup", googleSignup);
router.route("/check").post(protect , (req , res ) => Res.getObject(res).status(200).data({user : req.user}).end());

export default router