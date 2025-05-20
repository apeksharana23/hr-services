import mongoose from 'mongoose';
import User from '@/app/models/user';
import Designation from '@/app/models/designation';


const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
};


export async function GET(req) {
    try {
        await connectToDatabase();

        const designations = await Designation.find();
        const userCounts = await User.aggregate([
            { $match: { designation: { $ne: null } } },
            { $group: { _id: "$designation", count: { $sum: 1 } } },
        ]);


        const result = designations.map((desig) => {
            const match = userCounts.find((uc) => uc._id.toString() === desig._id.toString());
            return {
                name: desig.name,
                count: match ? match.count : 0,
            };
        });
        return new Response(JSON.stringify({ data: result }), { status: 200 });
    } catch (err) {
        console.error("Error fetching designations:", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}



export async function POST(req) {
    try {
        const { designationName, status } = await req.json();
        if (!designationName || !status) {
            return new Response("Designation name and status are required", { status: 400 });
        } else {
            console.log("Received data:", designationName, status);

        }
        const existingDesignation = await Designation.findOne({ name: designationName });
        if (existingDesignation) {
            return new Response("Designation already exists", { status: 400 });
        } else {
            console.log("no")
        }

        const newDesignation = new Designation({
            name: designationName,
            status: status || 'active',
        });

        await newDesignation.save();
        return new Response(JSON.stringify({ message: 'Designation added successfully' }), { status: 201 });
    } catch (err) {
        console.error("Error adding designation:", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}

