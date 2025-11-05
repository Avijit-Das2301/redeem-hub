import mongoose from "mongoose";

const redemptionSchema = new mongoose.Schema({
  user: { type: String, required: true },
  code: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["Success", "Failed"], default: "Success" },
});

export default mongoose.models.Redemption ||
  mongoose.model("Redemption", redemptionSchema);
