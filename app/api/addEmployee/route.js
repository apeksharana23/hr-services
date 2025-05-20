import { NextResponse } from 'next/server';
import dbConnect from '@/app/config/dbConfig';
import User from '@/app/models/user';
import bcrypt from 'bcryptjs';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.formData();
    const fullName = body.get('name');
    const profile = body.get('fileName'); 
    const joiningDate = body.get('joiningDate');
    const phone = body.get('phone');
    const email = body.get('email');
    const company = body.get('company');
    const designation = body.get('designation');
    const password = body.get('password');
    const username = body.get('username');

    // Validate required fields
    if (!fullName || !email || !phone || !password || !joiningDate || !username || !company) {
      return NextResponse.json({
        status: false,
        message: 'All required fields must be filled',
      }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    
    if (existingUser) {
      existingUser.name = fullName;
      existingUser.email = email;
      existingUser.phone = phone;
      existingUser.joiningDate = joiningDate;
      existingUser.company = company;
      existingUser.designation = designation;
      existingUser.username = username;


      if (password) {
        existingUser.password = await bcrypt.hash(password, 10);
      }

      // Handle profile image upload
      if (profile) {
        const buffer = Buffer.from(await profile.arrayBuffer());
        const filename = Date.now() + profile.name.replaceAll(" ", "_");
        const filePath = path.join(process.cwd(), 'public/uploads', filename);
        await writeFile(filePath, buffer);
        existingUser.profileImage = `/uploads/${filename}`;
      }

      await existingUser.save();

      return NextResponse.json({
        status: true,
        message: 'Employee updated successfully',
        data: existingUser,
      }, { status: 200 });
    }
 
    const hashedPassword = await bcrypt.hash(password, 10);
    let profilePath = null;

    if (profile) {
      const buffer = Buffer.from(await profile.arrayBuffer());
      const filename = Date.now() + profile.name.replaceAll(" ", "_");
      const filePath = path.join(process.cwd(), 'public/uploads', filename);
      await writeFile(filePath, buffer);
      profilePath = `/uploads/${filename}`;
    }

    const newUser = new User({
      name: fullName,
      profileImage: profilePath,
      email,
      phone,
      joiningDate,
      username,
      company,
      designation,
      password: hashedPassword,
      role: 'employee',
    });

    await newUser.save();
    return NextResponse.json({
      status: true,
      message: 'Employee added successfully',
      data: newUser,
    }, { status: 201 });

  } catch (error) {
    console.error('Employee operation error:', error);
    return NextResponse.json({
      status: false,
      message: error.message || 'Something went wrong',
    }, { status: 500 });
  }
}