import express from "express";
import {
  verifyJWT,
  verifyShopKeeper,
  verifyAdmin,
} from "../Middlewares/Auth.middleware.js";

import {
  getAllShops,
  addShop,
  getSingleShop,
  editShop,
  deleteShop,
} from "../Controllers/Shop.controller.js";
const router = express.Router();

router.route("/").get(verifyJWT, getAllShops).post(verifyJWT, addShop);
router
  .route("/:id")
  .get(getSingleShop)
  .patch(verifyJWT, verifyShopKeeper, editShop)
  .delete(verifyJWT,verifyAdmin,deleteShop);

export default router;
