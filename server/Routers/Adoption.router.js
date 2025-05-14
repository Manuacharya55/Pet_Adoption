import express from "express";
import {
  getAllAdoption,
  addAdoption,
  editAdoptionByAdmin,
  getRejectedAdoption,
  getApprovedAdoption,
  getSingleAdoption,
} from "../Controllers/Adoption.controller.js";
import { verifyJWT, verifyShopKeeper } from "../Middlewares/Auth.middleware.js";
const router = express.Router();

router.route("/").get(verifyJWT, verifyShopKeeper, getAllAdoption);
router.route("/approved").get(verifyJWT, verifyShopKeeper, getApprovedAdoption);
router.route("/rejected").get(verifyJWT, verifyShopKeeper, getRejectedAdoption);
router
  .route("/:id")
  .get(getSingleAdoption)
  .post(verifyJWT, addAdoption)
  .patch(verifyJWT, verifyShopKeeper, editAdoptionByAdmin);

export default router;
