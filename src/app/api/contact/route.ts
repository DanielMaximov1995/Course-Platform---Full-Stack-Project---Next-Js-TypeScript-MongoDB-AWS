import {dbConnect} from "@/utils/dbConnect";
import { NextResponse } from 'next/server'
import {transporter} from "@/utils/Email/Mail Config";
import ContactModel from "@/utils/models/ContactModel";

export const POST = async (req : Request) => {
    try {
        await dbConnect()

        const body = await req.json()

        const mailOptions = {
            from: `"DVF - עריכת וידאו בכדורגל" <dvf.course.israel@gmail.com>`,
            to: 'DanielMaximov2@gmail.com',
            subject: "יש לך הודעה חדשה!",
            html: `<div dir="rtl">
                <p>שם : ${body.name}</p>
                ${body?.email ? `<p>דוא"ל : ${body?.email}</p>` : null}
                ${body?.phone ? `<p>מס' טלפון : ${body?.phone}</p>` : null}
                ${body?.text ? `<p>הודעה : ${body?.text}</p>` : null}
                
            </div>`,
        };

        await transporter.sendMail({
            ...mailOptions,
        });

        await ContactModel.create(body);

        return NextResponse.json({ message : `תודה ${body?.name}, נדבר איתך בהקדם!` } , { status : 201 })
    } catch (err) {
        console.error(err)
        return NextResponse.json(`שגיאה בליצור קשר` , { status : 500 })
    }
}