import { NextResponse } from 'next/server';
import dbConnect from '@/app/config/dbConfig';
import Trainee from '@/app/models/trainees';
import bcrypt from 'bcrypt';
import User from '@/app/models/user';
import { send_mail } from "@/app/utils/emailUtils";
import TrainingType from '@/app/models/trainingtype';

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    try {
        const trainees = await Trainee.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await Trainee.countDocuments();
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            success: true,
            data: trainees,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error("Error fetching trainees:", error);
        return NextResponse.json({ success: false, message: 'Error fetching trainees' }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();

    try {
        const body = await req.json();
        const { firstName, lastName, email, contactNo, trainingType, status } = body;
        const requiredFields = [firstName, lastName, email, contactNo, trainingType, status];
        if (requiredFields.some(field => !field)) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const existingTrainee = await Trainee.findOne({ email: normalizedEmail });
        if (existingTrainee) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
        }

        const password = Math.random().toString(36).slice(2, 15);
        const hashedPassword = await bcrypt.hash(password, 10);

        const trainingTypeDoc = await TrainingType.findOne({ type: trainingType });

        if (!trainingTypeDoc) {
            return NextResponse.json({ error: 'Invalid training type selected' }, { status: 400 });
        }

        const newTrainee = await Trainee.create({
            firstName,
            lastName,
            email,
            contactNo,
            trainingType: trainingTypeDoc._id,
            password: hashedPassword,
            status: "Inactive",
            joiningDate: new Date(),
        });


        const existinguser = await User.find({ role: "hr" });
        if (existinguser) {
            existinguser.map((user) => {
                const htmlBody = `<p>Dear ${user.name},</p>
                    <p>You have received a new trainee enquiry. Here are the details:</p>
                    <ul>
                        <li><strong>First Name:</strong> ${firstName}</li>
                        <li><strong>Last Name:</strong> ${lastName}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Contact No:</strong> ${contactNo}</li>
                        <li><strong>Training Type:</strong> ${trainingType}</li>
                    </ul>
                    <p>Please review the trainee details in the HR Portal.</p>
                `;
                send_mail(user.email, "New Trainee Application", htmlBody);
                return
            });
        }


        return NextResponse.json({
            message: 'Trainee added and first HR notified via email',
            data: newTrainee
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating trainee:", error);
        return NextResponse.json({ error: 'Error creating trainee' }, { status: 500 });
    }
}