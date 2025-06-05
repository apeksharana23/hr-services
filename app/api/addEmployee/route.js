import { NextResponse } from 'next/server';
import dbConnect from '@/app/config/dbConfig';
import User from '@/app/models/user';
import bcrypt from 'bcryptjs';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    await dbConnect();

    // Parse formData from the request
    const formData = await req.formData();

    // Extract fields
    const fullName = formData.get('name');
    const profile = formData.get('fileName'); 
    const joiningDate = formData.get('joiningDate');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const company = formData.get('company');
    const designation = formData.get('designation');
    const password = formData.get('password');
    const username = formData.get('username');

    // Validate required fields
    if (!fullName || !email || !phone || !joiningDate || !username || !company) {
      return NextResponse.json(
        { status: false, message: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Check if user exists by email or username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      // Update existing user fields
      existingUser.name = fullName;
      existingUser.email = email;
      existingUser.phone = phone;
      existingUser.joiningDate = joiningDate;
      existingUser.company = company;
      existingUser.designation = designation || existingUser.designation;
      existingUser.username = username;

      if (password) {
        existingUser.password = await bcrypt.hash(password, 10);
      }

      // Handle profile image upload if new file provided
      if (profile && profile.size > 0) {
        const buffer = Buffer.from(await profile.arrayBuffer());
        const filename = Date.now() + '_' + profile.name.replace(/\s+/g, '_');
        const filePath = path.join(process.cwd(), 'public/uploads', filename);
        await writeFile(filePath, buffer);
        existingUser.profileImage = `/uploads/${filename}`;
      }

      await existingUser.save();

      return NextResponse.json(
        { status: true, message: 'Employee updated successfully', data: existingUser },
        { status: 200 }
      );
    }

    // Create new user

    const hashedPassword = await bcrypt.hash(password, 10);
    let profilePath = null;

    if (profile && profile.size > 0) {
      const buffer = Buffer.from(await profile.arrayBuffer());
      const filename = Date.now() + '_' + profile.name.replace(/\s+/g, '_');
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

    return NextResponse.json(
      { status: true, message: 'Employee added successfully', data: newUser },
      { status: 201 }
    );

  } catch (error) {
    console.error('Employee operation error:', error);
    return NextResponse.json(
      { status: false, message: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
