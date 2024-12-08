import { Schema, model } from "mongoose";

const PetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    age: {
      type: Number,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      enum: [
        "dog",
        "cat",
        "rabbit",
        "hamster",
        "parrot",
        "lovebird",
        "turtle",
        "tortoise",
        "Fish",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isAdopted: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
}
);

export const Pet = model("Pet", PetSchema);
