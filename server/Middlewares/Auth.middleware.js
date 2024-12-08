import jwt from "jsonwebtoken";
import { ApiError } from "../Utils/ApiError.js";

export const verifyJWT = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.send(new ApiError(400, "No Token found"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    throw new ApiError(401, error.message, "Invalid Token");
  }
  next();
};
