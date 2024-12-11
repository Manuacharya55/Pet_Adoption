import { Schema, model } from "mongoose";

const AdoptionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    petId: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
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

export const Adoption = model("Adoption", AdoptionSchema);
