import User from '@/app/models/user';
import dbConnect from '@/app/config/dbConfig';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    await dbConnect();

    const {
      name,
      email,
      phone,
      password,
      confirm_password,
    } = await request.json();

    const role = 'hr';

    if (!name || !email || !phone || !password || !confirm_password || !role) {
      return Response.json({ status: false, message: "All fields are required" }, { status: 400 });
    }

    if (password !== confirm_password) {
      return Response.json({ status: false, message: "Passwords do not match" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ status: false, message: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = await bcrypt.hash("some-random-token", 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      verificationToken,
      role
    });

    await newUser.save();

    return Response.json({
      status: true,
      message: "HR registered successfully",
      data: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role, 
        verificationToken: newUser.verificationToken,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,   
      }
    }, { status: 201 });

  } catch (err) {
    console.error("Signup Error:", err);
    return Response.json({ status: false, message: "Something went wrong" }, { status: 500 });
  }
}
