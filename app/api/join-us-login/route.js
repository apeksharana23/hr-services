import { NextResponse } from "next/server";
import dbConnect from '@/app/config/dbConfig';
import Trainee from '@/app/models/trainees';
import * as bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();
    const trainee = await Trainee.findOne({ email: email });
    if (trainee) {
      const isMatch = await bcrypt.compare(password, trainee.password);
      if (isMatch) {
        const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({ id: trainee._id.toString() }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(encodedKey);
        return new Response(JSON.stringify({
          status: true,
          message: "User Sign In Successfully",
          data: trainee,
          token: token,
          role: trainee.role
        }), { status: 200 });

      } else {
        return new Response(JSON.stringify({
          status: false,
          message: "Invalid Password",
        }), { status: 401 });
      }
    } else {
      return new Response(JSON.stringify({
        status: false,
        message: "Email id not found in our database"
      }), { status: 404 });
    }

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({
      status: false,
      message: err.message
    }), { status: 500 });
  }
}
