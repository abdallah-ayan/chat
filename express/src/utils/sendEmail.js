import { transporter } from "../lib/email.js";

export default async function (option) {
    try {
        await transporter.sendMail({
            from: '"chatify" <abdallah@ayan.com>', 
            to: option.to,
            subject: option.subject, // subject line
            text: option.text, // plain text body
            html: option.html, // HTML body
        });
    } catch (err) {}
}