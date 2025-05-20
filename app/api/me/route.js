import User from '@/app/models/user';
import dbConnect from '@/app/config/dbConfig';
import { jwtVerify } from 'jose';

export async function GET(request) {
    try {
        await dbConnect();

        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new Response(JSON.stringify({
                status: false,
                message: "Authorization token missing or malformed",
            }), { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, encodedKey);
        console.log("Payload:", payload); // Debugging line

        if (!payload || !payload.id) {
            return new Response(JSON.stringify({
                status: false,
                message: "Invalid token payload",
            }), { status: 400 });
        }

        const userId = payload.id;
        const user = await User.findById(userId, { password: 0 });
        if (user) {
            return new Response(JSON.stringify({
                status: true,
                user: user,
            }), { status: 200 });
        } else {
            return new Response(JSON.stringify({
                status: false,
                message: "User not found",
            }), { status: 404 });
        }

    } catch (err) {
        console.error("Error in GET /api/me:", err);
        return new Response(JSON.stringify({
            status: false,
            message: "Internal server error",
        }), { status: 500 });
    }
}