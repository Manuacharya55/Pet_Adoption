import { Pet } from "../Models/Pet.model.js";
import { Shop } from "../Models/Shop.model.js";
import ApiError from "../Utils/ApiError.js";
import { ApiSuccess } from "../Utils/ApiSuccess.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";

export const getAllPets = asyncHandler(async (req, res) => {
  const speciesQuery = req.query.species ? { species: req.query.species } : {};

  const pets = await Pet.find(speciesQuery);

  res.send(new ApiSuccess(200, "Data Successfully fetched", pets));
});

export const addPet = asyncHandler(async (req, res) => {
  const { name, age, breed, species, description, price } = req.body;
  const imageLocalPath = req.file?.path;
  
  const { _id } = req.shop;
  if (!name || !age || !breed || !species || !description || !price) {
    throw new ApiError(400, "All fields are required");
  }

  if (!imageLocalPath) {
    res.status(400).send(new ApiError(404, "Image Not Provided"));
    return;
  }

  const existingShop = await Shop.findById(_id);
  if (!existingShop) {
    throw new ApiError(400, "No shop found");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!req.user || !req.user._id) {
    throw new ApiError(403, "You are not authorized to perform this action");
  }

  const pet = await Pet.create({
    name,
    age,
    breed,
    species,
    description,
    price,
    shopId: _id,
    imageUrl: image.url,
  });
  res.send(new ApiSuccess(201, "Pet added successfully", pet));
});

export const getSinglePet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pet = await Pet.findById(id).populate("shopId");
  if (!pet) {
    throw new ApiError(404, "Pet not found");
  }
  res.send(new ApiSuccess(200, "Data Successfully fetched", pet));
});

export const editPet = asyncHandler(async (req, res) => {
  const { name, age, breed, species, description, price } = req.body;
  const imageLocalPath = req.file?.path;
  const { _id } = req.shop;
  const { id } = req.params;
  let image;
  if (!name || !age || !breed || !species || !description || !price) {
    throw new ApiError(400, "All fields are required");
  }

  if (imageLocalPath) {
    image = await uploadOnCloudinary(imageLocalPath);
  }

  const existingShop = await Shop.findById(_id);
  if (!existingShop) {
    throw new ApiError(400, "No shop found");
  }
  const updateData = {
    name,
    age,
    breed,
    species,
    description,
    price,
    shopId: _id,
  };

  if (image) {
    updateData.imageUrl = image.url;
  }

  const pet = await Pet.findByIdAndUpdate(id, updateData, { new: true });

  if (!pet) {
    throw new ApiError(404, "Pet not found");
  }
  res.send(new ApiSuccess(201, "Pet udpated successfully", pet));
});

export const deletePet = asyncHandler(async (req, res) => {
  const { _id } = req.shop;
  const { id } = req.params;

  const existingShop = await Shop.findById(_id);
  if (!existingShop) {
    throw new ApiError(400, "No shop found");
  }
  const pet = await Pet.findByIdAndDelete(id);

  if (!pet) {
    throw new ApiError(404, "Pet not found");
  }
  res.send(new ApiSuccess(201, "Pet deleted successfully", pet));
});

export const getPetByOwner = asyncHandler(async (req, res) => {
  const { _id } = req.shop;
  const pets = await Pet.find({ shopId: _id });

  if (!pets) {
    return res.status(400).send(new ApiError(400, "No pets found"));
  }

  res.send(new ApiSuccess(200, "Data Successfully fetched", pets));
});
