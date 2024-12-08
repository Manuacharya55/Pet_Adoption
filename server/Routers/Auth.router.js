import {Router} from "express";
import { registerUser, login, profile } from "../Controllers/Auth.controller.js";
import { verifyJWT } from "../Middlewares/Auth.middleware.js";
const router = Router();

router.route("/profile").get(verifyJWT,profile);
router.route("/register").post(registerUser);
router.route("/login").post(login);

export default router;
