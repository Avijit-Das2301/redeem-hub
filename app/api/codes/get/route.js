import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Code from "@/models/Code";

export async function GET() {
  await connectDB();

  const now = new Date();

  // Fetch all codes
  const codes = await Code.find();

  // Auto-update status for expired codes
  for (const code of codes) {
    if (code.expiry < now && code.status !== "expired") {
      code.status = "expired";
      await code.save();
    }
  }

  // Return updated list
  const updatedCodes = await Code.find();
  return NextResponse.json(updatedCodes);
}
