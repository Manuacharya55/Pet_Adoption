import express from "express";
import {
  getAllShops,
  addShop,
  getSingleShop,
  editShop,
  deleteShop,
} from "../Controllers/Shop.controller.js";
const router = express.Router();

router.route("/").get(getAllShops).post(addShop);
router
  .route("/:id")
  .get(getSingleShop)
  .patch(editShop)
  .delete(deleteShop);

export default router;
