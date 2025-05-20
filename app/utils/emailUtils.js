const nodemailer = require("nodemailer");


export async function send_mail(to, subject, message, cc = [], bcc = []) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, 587 false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: `${process.env.NEXT_PUBLIC_APP_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: to,
        subject: subject,
        html: message,
        cc,
        bcc,
    });

    if (info.accepted.length > 0) {
        return true;
    } else {
        return false;
    }
}