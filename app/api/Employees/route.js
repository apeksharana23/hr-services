import User from '@/app/models/user';
import Designation from '@/app/models/designation';
import dbConnect from '@/app/config/dbConfig';
import { NextResponse } from 'next/server';


export async function GET(req) {
    try {
        await dbConnect();

        // Get query parameters
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 5;
        const skip = (page - 1) * limit;

        // Total count (for pagination)
        const total = await User.countDocuments();
        const usersRaw = await User.find({}, '-password -verificationToken')
            .populate('designation', 'name')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const users = usersRaw.map(user => ({
            ...user.toObject(),
            designation: user.designation?.name || 'N/A',
        }));

        if (!users || users.length === 0) {
            return new Response(JSON.stringify({
                status: false,
                message: "No users found",
            }), { status: 404 });
        }

        return new Response(JSON.stringify({
            status: true,
            message: "Users retrieved successfully",
            data: users,
            total,
        }), { status: 200 });


    } catch (err) {
        console.error("Error fetching users:", err);
        return new Response(JSON.stringify({
            status: false,
            message: err.message
        }), { status: 500 });
    }
}

export async function DELETE(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    try {
        const deleted = await User.findByIdAndDelete(id); 
        if (!deleted) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'User deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
    }
}
