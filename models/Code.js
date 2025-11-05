import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ["common", "unique"], required: true },
  limit: { type: Number, default: 1 },
  redeemed: { type: Number, default: 0 },
  expiry: { type: Date, required: true },
  status: { type: String, enum: ["active", "expired"], default: "active" },
});

export default mongoose.models.Code || mongoose.model("Code", codeSchema);
