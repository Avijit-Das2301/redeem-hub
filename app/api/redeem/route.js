import { NextResponse } from "next/server";
import connectDB from "@/lib/db.js";
import Code from "@/models/Code.js";
import Redemption from "@/models/Redemption.js";
import User from "@/models/User.js";

export async function POST(req) {
  await connectDB();
  const { username, code } = await req.json();

  // Check if user exists
  const userExists = await User.findOne({ name: username });
  if (!userExists) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  const foundCode = await Code.findOne({ code: code.toUpperCase() });
  if (!foundCode)
    return NextResponse.json({ message: "Invalid code" }, { status: 404 });

  // Expiry Check
  if (new Date(foundCode.expiry) < new Date()) {
    foundCode.status = "expired";
    await foundCode.save();
    return NextResponse.json({ message: "Code expired" }, { status: 400 });
  }

  // Limit Check
  if (foundCode.redeemed >= foundCode.limit) {
    foundCode.status = "expired";
    await foundCode.save();
    return NextResponse.json(
      { message: "Redemption limit reached" },
      { status: 400 }
    );
  }

  // Already redeemed check (unique codes)
  if (foundCode.type === "unique") {
    const alreadyRedeemed = await Redemption.findOne({
      code: foundCode.code,
    });
    if (alreadyRedeemed) {
      return NextResponse.json(
        { message: "This unique code has already been used." },
        { status: 400 }
      );
    }
  }

  foundCode.redeemed += 1;
  await foundCode.save();

  await Redemption.create({
    user: username,
    code: foundCode.code,
    status: "Success",
    date: new Date(),
  });

  return NextResponse.json({ message: "Code redeemed successfully!" });
}
