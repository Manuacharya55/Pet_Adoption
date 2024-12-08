import { User } from "../Models/User.model.js";
import { ApiError } from "../Utils/ApiError.js";
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
    const existingUser = await User.findOne({ email});
    if(!existingUser){
        throw new ApiError(400,"User not found");
    }
    const isPasswordCorrect = await existingUser.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(401,"Invalid credentials");
    }
    const token = existingUser.generateToken();

    res.send(new ApiSuccess(200,"Logged In Successfully",token))
});

export const profile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) {
        throw new ApiError(404,"User not found");
    }
    res.send(new ApiSuccess(200,"User profile",user));
});
