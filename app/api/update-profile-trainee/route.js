import path from "path";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import Trainee from '@/app/models/trainees';
import dbConnect from '@/app/config/dbConfig';


export async function POST(req) {
    try {
        await dbConnect();
        const formData = await req.formData();
        const id = formData.get("id");
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const email = formData.get("email");
        const contactNo = formData.get("contactNo");
        const profile = formData.get("profileImage");

        const trainee = await Trainee.findById(id);
        if (!trainee) {
            return NextResponse.json({ status: false, message: "Invalid trainee" }, { status: 400 });
        }

        trainee.firstName = firstName;
        trainee.email = email;
        trainee.contactNo = contactNo;
        trainee.lastName = lastName;

        if (profile) {
            const buffer = Buffer.from(await profile.arrayBuffer());
            const filename = Date.now() + profile.name.replaceAll(" ", "_");
            await writeFile(path.join(process.cwd(), "public/uploads/" + filename), buffer);
            trainee.profileImage = `/uploads/${filename}`;
        }

        await trainee.save();
        return NextResponse.json({ status: true, message: "Profile updated", data: trainee });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ status: false, message: err.message }, { status: 500 });
    }
}
