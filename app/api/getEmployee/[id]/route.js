import User from '@/app/models/user';
import Designation from '@/app/models/designation';
import dbConnect from '@/app/config/dbConfig';
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const user = await User.findById(id, '-password -verificationToken');
        if (user) {
            return new Response(JSON.stringify({
                status: true,
                message: "User retrieved successfully",
                user: user,
            }), { status: 200 });
        } else {
            return new Response(JSON.stringify({
                status: false,
                message: "User not found",
            }), { status: 404 });
        }

    } catch (err) {
        console.error("Error fetching user:", err);
        return new Response(JSON.stringify({
            status: false,
            message: err.message
        }), { status: 500 });
    }
}

