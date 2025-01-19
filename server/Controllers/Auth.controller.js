import { Pet } from "../Models/Pet.model.js";
import { User } from "../Models/User.model.js";
import ApiError from "../Utils/ApiError.js";
import { ApiSuccess } from "../Utils/ApiSuccess.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400,"Required fields are empty");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400,"User already exists");
  }
  const user = await User.create({ name, email, password });
  const token = user.generateToken();
  res.send(
    new ApiSuccess(200, "Registered user successfully", { user, token })
  );
});

export const login = asyncHandler(async (req, res) => {
    const {email,password} = req.body;

    if(!email || !password) {
        throw new ApiError(400,"Required fields are empty");
    }
    const user = await User.findOne({ email});
    if(!user){
        throw new ApiError(400,"User not found");
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(401,"Invalid credentials");
    }
    const token = user.generateToken();

    res.send(new ApiSuccess(200,"Logged In Successfully",{token,user}))
});

export const profile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate("wishlist");
    if(!user) {
        throw new ApiError(404,"User not found");
    }
    res.send(new ApiSuccess(200,"User profile",user));
});

export const addtowishlist = asyncHandler(async (req, res) => {
  const { id } = req.params;
    const userId = req.user._id; 

    const existingpet = await Pet.findById(id);

    if (!existingpet) {
      return res.status(404).json(new ApiError(404,"No Such Pets"));
    }


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(new ApiError(404,"No Such Users"));
    }

    if (user.wishlist.includes(id)) {
      return res.status(400).send(new ApiError(404,"Pet is already in the wishlist"));
    }

    user.wishlist.push(id);
    await user.save();

    res.status(200).json(new ApiSuccess(200,"Added Sucessfully",existingpet));
});

export const removefromwishlist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;


  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json(new ApiError(404, "No Such User"));
  }


  const wishlistIndex = user.wishlist.indexOf(id);
  if (wishlistIndex === -1) {
    return res.status(400).json({ message: 'Pet not found in wishlist.' });
  }

  user.wishlist.splice(wishlistIndex, 1);
  await user.save();

  res.status(200).json(new ApiSuccess(200, "Removed Successfully", user));
});