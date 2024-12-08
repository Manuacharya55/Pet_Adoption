import express from "express";
import {
  getAllAdoption,
  addAdoption,
  editAdoption,
} from "../Controllers/Adoption.controller.js";
const router = express.Router();

router.route("/").get(getAllAdoption).post(addAdoption);
router.route("/:id").patch(editAdoption);

export default router;
