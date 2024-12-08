import express from "express";
import {
  getAllAdoption,
  addAdoption,
  editAdoption,
} from "../Controllers/Adoption.controller.js";
const router = express.Router();

router.route("/adoption").get(getAllAdoption).post(addAdoption);
router.route("/adoption/:id").patch(editAdoption);

export default router;
