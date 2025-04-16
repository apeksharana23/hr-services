// scripts/createAdmin.js
import 'dotenv/config'; // ✅ loads variables from .env
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../app/models/user.js';
import dbConnect from '../app/config/dbConfig.js';

async function createAdmin() {
  await dbConnect();

  const adminEmail = "admin@hrsystem.com";

  const adminExists = await User.findOne({ email: adminEmail });
  if (adminExists) {
    console.log("⚠️ Admin already exists.");
    mongoose.connection.close();
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = new User({
    name: "Super Admin",
    email: adminEmail,
    phone: "9465491533",
    password: hashedPassword,
    verified: true,
    role: "admin"
  });

  await admin.save();
  console.log("✅ Admin user created successfully!");
  mongoose.connection.close();
}

createAdmin();
