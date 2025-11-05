import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Code from "@/models/Code";

export async function POST(req) {
  await connectDB();
  const { code, type, limit, expiry } = await req.json();

  if (!code || !type || !expiry) {
    return NextResponse.json(
      { error: "All fields (code, type, expiry) are required." },
      { status: 400 }
    );
  }

  // Check if code already exists
  const existing = await Code.findOne({ code: code.toUpperCase() });
  if (existing) {
    return NextResponse.json(
      { error: "Code already exists. Please use a unique value." },
      { status: 400 }
    );
  }

  // Create new code
  const newCode = await Code.create({
    code: code.toUpperCase(),
    type,
    limit: type === "common" ? Number(limit) || 1 : 1,
    expiry,
    redeemed: 0,
    status: "active",
  });

  return NextResponse.json({
    message: "Code created successfully",
    code: newCode,
  });
}
