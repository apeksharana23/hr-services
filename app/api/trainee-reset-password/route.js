import dbConnect from '@/app/config/dbConfig';
import Trainee from '@/app/models/traines';
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

        const trainee = await Trainee.findOne({ verificationToken: token });
        if (!trainee) {
            return NextResponse.json(
                { status: false, message: "Invalid or expired token." },
                { status: 404 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        trainee.password = hashedPassword;
        trainee.verificationToken = null;
        await trainee.save();
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