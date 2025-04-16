import { NextResponse } from 'next/server';
import dbConnect from '@/app/config/dbConfig';
import User from '@/app/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const { name, email, password, phone } = body;

    if (!name || !email || !password || !phone) {
      return NextResponse.json({
        status: false,
        message: 'All required fields must be filled',
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        status: false,
        message: 'User already exists',
      }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({
      status: true,
      message: 'Employee added successfully',
      data: newUser,
    }, { status: 201 });

  } catch (error) {
    console.error('Add employee error:', error);
    return NextResponse.json({
      status: false,
      message: error.message || 'Something went wrong',
    }, { status: 500 });
  }
}
