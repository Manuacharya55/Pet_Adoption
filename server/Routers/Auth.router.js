import {Router} from "express";
import { registerUser, login, profile, addtowishlist, removefromwishlist } from "../Controllers/Auth.controller.js";
import { verifyJWT } from "../Middlewares/Auth.middleware.js";
const router = Router();

router.route("/profile").get(verifyJWT,profile);
router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/:id").post(verifyJWT,addtowishlist).delete(verifyJWT,removefromwishlist);

export default router;
