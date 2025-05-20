import dbConnect from '@/app/config/dbConfig';
import User from '@/app/models/user';
import { send_mail } from '@/app/utils/emailUtils';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        await dbConnect();

        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: "Email is required." },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User not found." },
                { status: 404 }
            );
        }
        
        const token = (await bcrypt.hash(`ran_prefix_${Math.random()}`, 10)).toString();
        const encodedToken = encodeURIComponent(token);
        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${encodedToken}`;
        const htmlMessage = `
            <h1>Password Reset Request</h1>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}" target="_blank">Reset Password</a>
        `;
        await send_mail(user.email, "Password Reset Request", htmlMessage);
        user.verificationToken = token;
        await user.save();
        return NextResponse.json({ message: "Password reset link sent to your email.", status: true }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}
