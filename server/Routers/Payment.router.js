import {Router} from "express";
import { verifyJWT } from "../Middlewares/Auth.middleware.js";
import { processPayment } from "../Controllers/Payment.controller.js";
const router = Router();

router.route("/:id").post(verifyJWT,processPayment);


export default router;
