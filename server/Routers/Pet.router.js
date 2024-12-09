import express from "express";
import {
  getAllPets,
  addPet,
  getSinglePet,
  editPet,
  deletePet,
} from "../Controllers/Pet.controller.js";
import { verifyJWT, verifyShopKeeper } from "../Middlewares/Auth.middleware.js";
const router = express.Router();

router
  .route("/")
  .get(verifyJWT, getAllPets)
  .post(verifyJWT, verifyShopKeeper, addPet);
router
  .route("/:id")
  .get(verifyJWT, getSinglePet)
  .patch(verifyJWT, verifyShopKeeper, editPet)
  .delete(verifyJWT, verifyShopKeeper, deletePet);

export default router;
