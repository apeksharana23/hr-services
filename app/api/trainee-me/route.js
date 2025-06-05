import Trainee from '@/app/models/trainees';
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

        const trainee_token = authHeader.split(' ')[1];
        if (!trainee_token || trainee_token.split('.').length !== 3) {
            return new Response(JSON.stringify({
                status: false,
                message: "Invalid or malformed token",
            }), { status: 400 });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            return new Response(JSON.stringify({
                status: false,
                message: "Server configuration error",
            }), { status: 500 });
        }

        const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);
        let payload;
        try {
            const result = await jwtVerify(trainee_token, encodedKey, {
                algorithms: ['HS256'],
            });
            payload = result.payload;
        } catch (err) {
            if (err.code === 'ERR_JWT_EXPIRED') {
                return new Response(JSON.stringify({
                    status: false,
                    message: "Token has expired",
                }), { status: 401 });
            }
            console.error("JWT Verification Error:", err);
            return new Response(JSON.stringify({
                status: false,
                message: "Invalid token",
            }), { status: 400 });
        }

        if (!payload || !payload.id) {
            return new Response(JSON.stringify({
                status: false,
                message: "Invalid token payload",
            }), { status: 400 });
        }

        const traineeId = payload.id;
        const trainee = await Trainee.findById(traineeId, { password: 0 });
        if (trainee) {
            return new Response(JSON.stringify({
                status: true,
                trainee: trainee,
            }), { status: 200 });
        } else {
            return new Response(JSON.stringify({
                status: false,
                message: "Trainee not found",
            }), { status: 404 });
        }

    } catch (err) {
        console.error("Error in GET /api/trainee-me:", err);
        return new Response(JSON.stringify({
            status: false,
            message: "Internal server error",
        }), { status: 500 });
    }
}