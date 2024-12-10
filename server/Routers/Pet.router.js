import express from "express";
import {
  getAllPets,
  addPet,
  getSinglePet,
  editPet,
  deletePet,
  getPetByOwner,
} from "../Controllers/Pet.controller.js";
import { upload } from "../Middlewares/Multer.middleware.js";
import { verifyJWT, verifyShopKeeper } from "../Middlewares/Auth.middleware.js";
const router = express.Router();

router
  .route("/")
  .get(verifyJWT, getAllPets)
  .post(verifyJWT, verifyShopKeeper,upload.single("imageUrl"), addPet);

router.route("/specificpet").get(verifyJWT, verifyShopKeeper, getPetByOwner);

router
  .route("/:id")
  .get(verifyJWT, getSinglePet)
  .patch(verifyJWT, verifyShopKeeper, editPet)
  .delete(verifyJWT, verifyShopKeeper, deletePet);

export default router;
