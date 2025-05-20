import mongoose from 'mongoose';
import Designation from '@/app/models/designation';


const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
};


export async function GET(req) {
    try {
        await connectToDatabase();

        const designations = await Designation.find({status: 'active'});
        const data = [];
        designations.map((designation) => {
            data.push({
                id: designation._id,
                name: designation.name,
            });
        });

        return new Response(JSON.stringify({ data: data }), { status: 200 });
    } catch (err) {
        console.error("Error fetching designations:", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}
