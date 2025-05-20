import { NextResponse } from "next/server";
import dbConnect from '@/app/config/dbConfig';
import Trainee from '@/app/models/traines';
import bcrypt from "bcryptjs";

export async function POST(req) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const trainee = await Trainee.findOne({ email });
    if (!trainee) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, trainee.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login successful"
    }, { status: 200 });

  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
