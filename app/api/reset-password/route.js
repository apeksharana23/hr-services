import dbConnect from '@/app/config/dbConfig';
import User from '@/app/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        await dbConnect();

        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json(
                { status: false, message: "Invalid data provided." },
                { status: 400 }
            );
        }

        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return NextResponse.json(
                { status: false, message: "Invalid or expired token." },
                { status: 404 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.verificationToken = null;
        await user.save();
        return NextResponse.json(
            { status: true, message: "Password reset successfully." },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { status: false, message: "Internal server error." },
            { status: 500 }
        );
    }
}