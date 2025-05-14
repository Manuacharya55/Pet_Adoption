import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiSuccess } from "../Utils/ApiSuccess.js";
import ApiError from "../Utils/ApiError.js";
import { Pet } from "../Models/Pet.model.js";
import { User } from "../Models/User.model.js";
import { Adoption } from "../Models/Adoption.model.js";
import nodemailer from "nodemailer";

// Utility function to send emails
const sendEmail = async (shopname, recipient, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  try {
    const info = await transporter.sendMail({
      from: `"${shopname}" <${process.env.NODEMAILER_USER}>`,
      to: recipient,
      subject,
      text,
      html,
    });

    console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));
    return "Email sent successfully";
  } catch (err) {
    console.error("Email error:", err);
    return "Couldn't send email";
  }
};


// Get all adoptions for a specific shopkeeper
export const getAllAdoption = asyncHandler(async (req, res) => {
  const shopId = req.shop._id;

  const adoptions = await Adoption.find({ status: "pending",shopId: shopId})
    .populate({
      path: "userId",
      select: "name email",
    })
    .populate({
      path: "petId",
      select: "name breed image",
    });
  res.status(200).json(new ApiSuccess(200, "Successfully fetched",adoptions));
});


// get single adoption
export const getSingleAdoption = asyncHandler(async (req, res) => {
  console.log("adoption")
  const {id} = req.params;

  const adoptions = await Adoption.findById(id)
    .populate({
      path: "userId",
      select: "name email",
    })
    .populate({
      path: "petId",
      select: "name breed image price",
    });

    console.log(adoptions)
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

  pet.isAdopted = true;
  await pet.save();
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
  if(status == "approved"){
    const updated = await Pet.findByIdAndUpdate(
      pet._id,
      { isAdopted: true },
      { new: true }
    );
  }
  await adoption.save();

  const user = adoption.userId;
  const { name, email } = await User.findById(user);
  const subject = `Adoption Request ${
    status.charAt(0).toUpperCase() + status.slice(1)
  }`;

  const text = `Dear ${name}, your adoption request for pet ${pet.name} has been ${status}. Visit us at ${req.shop.location} or contact: ${req.shop.contactInfo}`;

  const html = `
    <p>Dear ${name},</p>
  
    <p>We are happy to inform you that your adoption request for pet <strong>${pet.name}</strong> has been <strong>${status}</strong>.</p>
  
    <p>If you have any queries, feel free to visit our shop at <strong>${req.shop.location}</strong> or contact us at <strong>${req.shop.contactInfo}</strong>. Our team will be more than happy to assist you!</p>
  
    <p><a href="http://localhost:5173/payment/${adoptionId}">Click here to make payment</a></p>
  
    <p>Thank you for considering adoption and supporting our cause. We hope to see you soon!</p>
  
    <p>Best Regards,<br/>
    ${req.shop.name}<br/>
    ${req.shop.contactInfo}</p>
  `;
  
  const msg = await sendEmail(req.shop.name, email, subject, text, html);

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
