import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiSuccess } from "../Utils/ApiSuccess.js";
import ApiError from "../Utils/ApiError.js";
import { Pet } from "../Models/Pet.model.js";
import { User } from "../Models/User.model.js";
import { Adoption } from "../Models/Adoption.model.js";
import nodemailer from "nodemailer";

// Utility function to send emails
const sendEmail = async (shopname,recipient, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD
        }
    });

  await transporter.sendMail({
    from: `${shopname}`,
    to: "belveacharya55@gmail.com",
    subject,
    text,
  }, function (err, data) {
    if (err) {
        return "couldnt send email";
    } else {
        return "email sent successfully";
    }
});
};

// Get all adoptions for a specific shopkeeper
export const getAllAdoption = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;

  const adoptions = await Adoption.find({ status: "pending" })
    .populate({
      path: "userId",
      select: "name email",
    })
    .populate({
      path: "petId",
      select: "name breed image",
      match: { shopId },
    });

  res.status(200).json(new ApiSuccess(200, "Successfully fetched",adoptions));
});

// Add adoption request
export const addAdoption = asyncHandler(async (req, res) => {
  const { id: petId } = req.params; // Pet ID from params
  const userId = req.user._id;

  const pet = await Pet.findById(petId);
  if (!pet) {
    res.send( new ApiError("Pet not found", 404))
  }

  const newAdoption = await Adoption.create({
    userId,
    petId,
    shopId: pet.shopId,
  });

  res
    .status(201)
    .json(new ApiSuccess(newAdoption, "Adoption request submitted"));
});

// Edit adoption status by shopkeeper
export const editAdoptionByAdmin = asyncHandler(async (req, res) => {
  const shopkeeperId = req.shop._id;
  const { id: adoptionId } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    res.send( new ApiError("Invalid status", 400))
  }

  const adoption = await Adoption.findById(adoptionId).populate({
    path: "userId",
    select: "email",
  });

  if (!adoption) {
    res.send( new ApiError("Adoption request not found", 404))
  }

  const pet = await Pet.findById(adoption.petId);
  if (!pet || pet.shopId.toString() !== shopkeeperId.toString()) {
    res.send( new ApiError("Unauthorized to modify this adoption", 403))
  }

  adoption.status = status;
  await adoption.save();

  const user = adoption.userId;
  const { name, email } = await User.findById(user);
  const subject = `Adoption Request ${
    status.charAt(0).toUpperCase() + status.slice(1)
  }`;

  const text = `
  Dear ${name},

  We are happy to inform you that your adoption request for pet ${pet.name} has been ${status}. 
  If you have any queries, feel free to visit our shop located at ${req.shop.location} or contact us at ${req.shop.contactInfo}. 
  Our team will be more than happy to assist you!

  Thank you for considering adoption and supporting our cause. We hope to see you soon!

  Best Regards,
  ${req.shop.name}
  ${req.shop.contactInfo}
`;



  const msg = await sendEmail(req.shop.name,email ,subject, text);

  res.status(200).json(new ApiSuccess({adoption,msg}, `Adoption request ${status}`));
});

export const getRejectedAdoption = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;

  const adoptions = await Adoption.find({ status: "rejected" })
    .populate({
      path: "userId",
      select: "name email",
    })
    .populate({
      path: "petId",
      select: "name breed image",
      match: { shopId },
    });

  res.status(200).json(new ApiSuccess(adoptions, "Successfully fetched rejected adoptions"));
});

export const getApprovedAdoption = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;

  const adoptions = await Adoption.find({ status: "approved" })
    .populate({
      path: "userId",
      select: "name email",
    })
    .populate({
      path: "petId",
      select: "name breed image",
      match: { shopId },
    });

  res.status(200).json(new ApiSuccess(adoptions, "Successfully fetched approved adoptions"));
});
