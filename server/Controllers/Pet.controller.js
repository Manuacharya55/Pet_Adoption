import { Pet } from "../Models/Pet.model.js";
import { Shop } from "../Models/Shop.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiSuccess } from "../Utils/ApiSuccess.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";

export const getAllPets = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;

  const skip = (page - 1) * limit;

  const pets = await Pet.find().skip(skip).limit(limit);

  res.send(new ApiSuccess(200, "Data Successfully fetched", pets));
});

export const addPet = asyncHandler(async (req, res) => {
  const { name, age, breed, species, description, price } = req.body;
  const { _id } = req.shop;
  if (!name || !age || !breed || !species || !description || !price) {
    throw new ApiError(400, "All fields are required");
  }

  const existingShop = await Shop.findById(_id);
  if (!existingShop) {
    throw new ApiError(400, "No shop found");
  }
  const pet = await Pet.create({
    name,
    age,
    breed,
    species,
    description,
    price,
    shopId: _id,
  });
  res.send(new ApiSuccess(201, "Pet added successfully", pet));
});

export const getSinglePet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pet = await Pet.findById(id);
  if (!pet) {
    throw new ApiError(404, "Pet not found");
  }
  res.send(new ApiSuccess(200, "Data Successfully fetched", pet));
});

export const editPet = asyncHandler(async (req, res) => {
  const { name, age, breed, species, description, price } = req.body;
  const { _id } = req.shop;
  const { id } = req.params;

  if (!name || !age || !breed || !species || !description || !price) {
    throw new ApiError(400, "All fields are required");
  }

  const existingShop = await Shop.findById(_id);
  if (!existingShop) {
    throw new ApiError(400, "No shop found");
  }
  const pet = await Pet.findByIdAndUpdate(
    id,
    {
      name,
      age,
      breed,
      species,
      description,
      price,
      shopId: _id,
    },
    { new: true }
  );

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
  console.log("Delete");
  const pet = await Pet.findByIdAndDelete(id);

  if (!pet) {
    throw new ApiError(404, "Pet not found");
  }
  res.send(new ApiSuccess(201, "Pet deleted successfully", pet));
});