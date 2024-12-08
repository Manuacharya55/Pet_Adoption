import express from "express";
import { register, login, profile } from "../Controllers/Auth.controller.js";
const router = express.Router();

router.route("/auth/register").post(register);
router.route("/auth/login").post(login);
router.route("/auth/profile").get(profile);

export default router;
