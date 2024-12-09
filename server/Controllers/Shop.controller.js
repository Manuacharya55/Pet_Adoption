import { Shop } from "../Models/Shop.model.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiSuccess } from "../Utils/ApiSuccess.js";
import { User } from "../Models/User.model.js";
import { ApiError } from "../Utils/ApiError.js";

export const getAllShops = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit) || 2;

  const skip = parseInt(page - 1) * limit;

  const shops = await Shop.find().skip(skip).limit(limit);
  res.send(new ApiSuccess(200, "Fetched Data Successfully", shops));
});

export const addShop = asyncHandler(async (req, res) => {
  const { name, location, contactInfo } = req.body;

  if (!name || !location || !contactInfo) {
    throw new ApiError(400, "Required fields are empty");
  }

  const existingShop = await Shop.findOne({ ownerId: req.user._id });
  if (existingShop) {
    throw new ApiError(400, "You already have a shop");
  }

  if (!req.user || !req.user._id) {
    throw new ApiError(403, "You are not authorized to perform this action");
  }


  const newShop = await Shop.create({
    name,
    location,
    contactInfo,
    ownerId: req.user._id,
  });

  await User.findByIdAndUpdate(
    req.user._id,
    { role: "shopkeeper" },
    { new: true }
  );

  res.status(201).send(
    new ApiSuccess(201, "You are registered as a shopkeeper", {
      shop: newShop,
    })
  );
});


export const getSingleShop = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const shop = await Shop.findById(id);

  if (!shop) {
    throw new ApiError(404, "Shop not found");
  }
  res.send(new ApiSuccess(200, "Fetched Data Successfully", shop));
});


export const editShop = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, location, contactInfo } = req.body;

  // Validate input fields
  if (!name || !location || !contactInfo) {
    throw new ApiError(400, "Required fields are empty");
  }

  const updatedShop = await Shop.findByIdAndUpdate(
    id,
    { name, location, contactInfo },
    { new: true }
  );

  if (!updatedShop) {
    throw new ApiError(404, "Shop not found");
  }

  // Send success response
  res
    .status(200)
    .json(new ApiSuccess(200, "Shop updated successfully", updatedShop));
});

export const deleteShop = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existingShop = await Shop.findById(id);
  if (!existingShop) {
    throw new ApiError(404, "Shop not found");
  }
  const existingUser = await User.findById(existingShop.ownerId);

  if (!existingUser) {
    throw new ApiError(400, "No User Exists");
  }
  const shop = await Shop.findByIdAndDelete(id);
  existingUser.role = "user";
  await existingUser.save();
  res.send(new ApiSuccess(200, "Shop deleted successfully", shop));
});
