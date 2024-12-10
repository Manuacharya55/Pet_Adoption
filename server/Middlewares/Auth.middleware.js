import jwt from "jsonwebtoken";
import { ApiError } from "../Utils/ApiError.js";
import { User } from "../Models/User.model.js";
import { Shop } from "../Models/Shop.model.js";

export const verifyJWT = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.send(new ApiError(400, "No Token found"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("user verified")
  } catch (error) {
    throw new ApiError(401, error.message, "Invalid Token");
  }
  next();
};

export const verifyShopKeeper = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log(user);
  if (user.role !== "shopkeeper") {
    return res.status(403).send(new ApiError(403, "Unauthorized Access"));
  }
  const shop = await Shop.findOne({ownerId: req.user._id});
  req.shop = shop;
  console.log("admin specified")
  next();
};

export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send(new ApiError(403, "Unauthorized Access"));
  }
  next();
};
