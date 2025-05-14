
import dotenv from "dotenv";
import Stripe from "stripe";

import { Adoption } from "../Models/Adoption.model.js"
import { Pet } from "../Models/Pet.model.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
  try {
    console.log("hiiii")
    const { petId, totalAmount, paymentMethodId,adoptId } = req.body;

    // Validate request data
    if (!petId || !adoptId || !totalAmount || !paymentMethodId) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Fetch user and product details
    const existingPet = await Pet.findById(petId);
    // if (!existingPet)
    //   return res.status(404).json({ error: "Pet not found!" });

    const existingAdoption = await Adoption.findById(adoptId);
    if (!existingAdoption)
      return res.status(404).json({ error: "Pet not found!" });

    // Convert amount to paise
    const amountInPaise = Math.round(parseFloat(totalAmount) * 100);
    if (isNaN(amountInPaise) || amountInPaise <= 0) {
      return res.status(400).json({ error: "Invalid total amount!" });
    }

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPaise,
      currency: "inr",
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // Avoids redirect issues
      },
    });

    // Save rent transaction in MongoDB
   const adoptions = await Adoption.findByIdAndUpdate(adoptId,{
    payment:"successfull"
   })

    res.status(200).json({
      success: true,
      message: "Payment successful and rent recorded",
      adoptions,
    });
  } catch (error) {
    console.error("Stripe Payment Error:", error.message);
    res.status(500).json({ error: "Internal Server Error! " + error.message });
  }
};