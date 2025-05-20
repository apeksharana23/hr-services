import { NextResponse } from 'next/server';
import dbConnect from '@/app/config/dbConfig';
import Trainee from '@/app/models/traines';
import bcrypt from 'bcrypt';
import { send_mail } from "@/app/utils/emailUtils";

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

        const password = Math.random().toString(36).substr(2, 10);
        const hashPassword = await bcrypt.hash(password, 10);
        const newTrainee = await Trainee.create({
            firstName,
            lastName,
            email,
            contactNo,
            trainingType,
            status,
            password: hashPassword
        });

        const htmlBody = `<p>Hi ${firstName} ${lastName}</p>
        <p>Welcome to the HR portal. Please log in using the details below:</p>
        <p>
        <strong>Email:</strong> ${email}<br/>
        <strong>Password:</strong> ${password}
        </p>`;

        const mailResponse = await send_mail(email, "Your HR Portal Credentials", htmlBody);

        if (!mailResponse) {
            return NextResponse.json({
                error: 'Trainee added, but failed to send email.'
            }, { status: 500 });
        }

        return NextResponse.json({
            message: 'Trainee added and email sent',
            data: newTrainee
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating trainee:", error);
        return NextResponse.json({ error: 'Error creating trainee' }, { status: 500 });
    }
}




export async function PUT(req) {
    await dbConnect();

    try {
        const body = await req.json();
        const { firstName, lastName, email, contactNo, trainingType, status } = body;
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const trainee = await Trainee.findById(id);
        const updateData = {firstName, lastName, email, contactNo, trainingType, status};
        const password = Math.random().toString(36).slice(-8);
        if (trainee.status==="Inactive" && status === "Active") {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }
        
        const updatedTrainee = await Trainee.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedTrainee) {
            return NextResponse.json({ error: 'Trainee not found' }, { status: 404 });
        }

        if (trainee.status==="Inactive" && status === "Active") {
            const htmlBody = `
                    <p>Dear ${firstName},</p>
                    <p>Your trainee account is now <strong>Active</strong>.</p>
                    <p>Here are your login credentials:</p>
                    <ul>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Password:</strong> ${password}</li>
                        <li><strong>Login URL:</strong> [Your Login Page URL]</li>
                    </ul>
                    <p>It's recommended to change your password after first login.</p>
                    <p>Regards,<br/>HR Team</p>
                `;

            await send_mail(email, "Your Login Credentials", htmlBody);
        }

        return NextResponse.json({ message: 'Trainee updated successfully', data: updatedTrainee });

    } catch (error) {
        console.error("Error updating trainee:", error);
        return NextResponse.json({ error: 'Error updating trainee' }, { status: 500 });
    }
}



export async function DELETE(req) {
    await dbConnect();

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing trainee ID' }, { status: 400 });
        }

        const deleted = await Trainee.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ error: 'Trainee not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Trainee deleted successfully' });
    } catch (error) {
        console.error("Error deleting trainee:", error);
        return NextResponse.json({ error: 'Error deleting trainee' }, { status: 500 });
    }
}
