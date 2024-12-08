import { Schema, model } from "mongoose";

const ShopSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      type: String,
      required: true,
    },
    contactInfo: {
      type: Number,
      required: true,
    },
  },
  { timestamps }
);

export const Shop = model("Shop", ShopSchema);
