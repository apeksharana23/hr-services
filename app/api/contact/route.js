import dbConnect from '@/app/config/dbConfig';
import Contact from '@/app/models/contact';
import { NextResponse } from "next/server";
import { send_mail } from "@/app/utils/emailUtils";


export async function POST(request) {
    try {
        await dbConnect();

        const body = await request.json();
        const { name, email, phone, message } = body;

        if (!name || !email || !phone || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        

        const htmlMessage = `
            <h1>Contact Us Form Submission</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `;

        const mailResponse = await send_mail(email, "New Contact Us Message", htmlMessage, []);
        if (mailResponse) {
            return new Response(JSON.stringify({
                status: true,
                message: "Message sent successfully",
            }), { status: 200 });
        }
        return new Response(JSON.stringify({
            status: false,
            message: "Failed to send message",
        }), { status: 500 });  

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({
            status: false,
            message: err.message
        }), { status: 500 });
    }
}
