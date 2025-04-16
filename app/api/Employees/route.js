import User from '@/app/models/user';
import dbConnect from '@/app/config/dbConfig';

export async function GET() {
    try {
        await dbConnect();

        const users = await User.find({}, '-password -verificationToken'); 

        if (!users || users.length === 0) {
            return new Response(JSON.stringify({
                status: false,
                message: "No users found",
            }), { status: 404 });
        }

        return new Response(JSON.stringify({
            status: true,
            message: "Users retrieved successfully",
            data: users
        }), { status: 200 });

    } catch (err) {
        console.error("Error fetching users:", err);
        return new Response(JSON.stringify({
            status: false,
            message: err.message
        }), { status: 500 });
    }
}
