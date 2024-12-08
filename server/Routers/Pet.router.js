import express from "express";
import {
  getAllPets,
  addPet,
  getSinglePet,
  editPet,
  deletePet,
} from "../Controllers/Pet.controller.js";
const router = express.Router();

router.route("/").get(getAllPets).post(addPet);
router.route("/:id").get(getSinglePet).patch(editPet).delete(deletePet);

export default router;
