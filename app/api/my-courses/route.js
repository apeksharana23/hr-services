import Trainee from '@/app/models/trainees';
import TrainingType from '@/app/models/trainingtype';
import dbConnect from '@/app/config/dbConfig';
import { jwtVerify } from 'jose';


export async function POST(request) {
    await dbConnect();
    try {
        const { token } = await request.json();
        const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, encodedKey);
        const traineeId = payload.id;
        if (!traineeId) {
            return new Response(JSON.stringify({
                status: false,
                message: "Invalid token",
            }), { status: 401 });
        }
        
        const trainee = await Trainee.findById(traineeId);

        if (!trainee) {
            return new Response(JSON.stringify({
                status: false,
                message: "Trainee not found",
            }), { status: 404 });
        }

        const traineeTypes = await TrainingType.findById(trainee.trainingType);
        if (!traineeTypes) {
            return new Response(JSON.stringify({
                status: false,
                message: "Training type not found",
            }), { status: 404 });
        }

        const data = {
            traineeId: trainee._id,
            course_id: traineeTypes._id,
            course_name: traineeTypes.type,
            course_description: traineeTypes.description,
            joining_date: trainee.createdAt, 
            status: 'Active',
        }

        return new Response(JSON.stringify({
            status: true,
            data: data,
        }), { status: 200 });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({
            status: false,
            message: "Internal server error",
        }), { status: 500 });
    }
}