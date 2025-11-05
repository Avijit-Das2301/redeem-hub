import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Redemption from "@/models/Redemption";

export async function GET() {
  await connectDB();
  const redemptions = await Redemption.find().sort({ date: -1 });
  return NextResponse.json(redemptions);
}
