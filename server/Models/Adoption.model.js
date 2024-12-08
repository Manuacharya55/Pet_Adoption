import { Schema, model } from "mongoose";

const PetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    petId: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true
}
);

export const Adoption = model("Pet", PetSchema);
