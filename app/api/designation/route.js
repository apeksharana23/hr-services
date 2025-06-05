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
                _id: desig._id,
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

export async function PUT(req) {
    try {
        await connectToDatabase();

        const { id, designationName, status } = await req.json();

        if (!id || !designationName || !status) {
            return new Response("ID, designationName and status are required", { status: 400 });
        }

        const designation = await Designation.findById(id);
        if (!designation) {
            return new Response("Designation not found", { status: 404 });
        }

        designation.name = designationName;
        designation.status = status;

        await designation.save();

        return new Response(JSON.stringify({ message: "Designation updated successfully" }), { status: 200 });
    } catch (err) {
        console.error("Error updating designation:", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}


export async function DELETE(req) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return new Response("Designation ID is required", { status: 400 });
        }

        const deleted = await Designation.findByIdAndDelete(id);

        if (!deleted) {
            return new Response("Designation not found", { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Designation deleted successfully" }), { status: 200 });

    } catch (err) {
        console.error("Error deleting designation:", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}


