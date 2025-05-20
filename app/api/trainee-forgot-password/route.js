import dbConnect from '@/app/config/dbConfig';
import Trainee from '@/app/models/traines';
import { send_mail } from '@/app/utils/emailUtils';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        await dbConnect();

        const body = await request.json();
        const { email } = body;

        if (!email ) {
            return NextResponse.json(
                { error: "Email is required." },
                { status: 400 }
            );
        }

        const trainee = await Trainee.findOne({ email });
        if (!trainee) {
            return NextResponse.json(
                { error: "Trainee not found." },
                { status: 404 }
            );
        }
        
        const token = (await bcrypt.hash(`ran_prefix_${Math.random()}`, 10)).toString();
        const encodedToken = encodeURIComponent(token);
        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/trainee-reset-password/${encodedToken}`;
        const htmlMessage = `
            <h1>Password Reset Request</h1>
      <p>Hello, <strong>${trainee.firstName}</strong></p>
      <p>
        We received a request to reset your password. If you didn’t make this request,
        you can safely ignore this email.
      </p>
      <p>
        To reset your password, click the button below:
      </p>
      <a href="${resetLink}" target="_blank" class="btn">Reset Password</a>
      <p>
        This link will expire in 15 minutes for security reasons.
      </p>
        `;
        await send_mail(trainee.email, "Password Reset Request", htmlMessage);
        trainee.verificationToken = token;
        await trainee.save();
        return NextResponse.json({ message: "Password reset link sent to your email.", status: true }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}
