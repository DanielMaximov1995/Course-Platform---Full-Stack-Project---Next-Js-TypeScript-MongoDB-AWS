import {dbConnect} from "@/utils/dbConnect";
import { NextResponse } from 'next/server'
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import UserSchema from "@/utils/models/usersModel";
import LessonSchema from "@/utils/models/LessonsModel";

export const GET = async () => {
    try {
        await dbConnect()
        const session = await getServerSession(authOptions)
        if(!session) {
            return NextResponse.json({ message : 'אין לך את ההרשאה לבצע פעולה זאת !' } , { status : 401 })
        }
        const { isAdmin } = await UserSchema.findById(session?.user?._id)
        if(!isAdmin) {
            return NextResponse.json({ message : 'אין לך את ההרשאה לבצע פעולה זאת !' } , { status : 401 })
        }

        const data =  await LessonSchema.find()
        return NextResponse.json(data , { status : 201 })
    } catch (err) {
        console.error(err)
        return NextResponse.json(`שגיאה בלייבא שיעורים` , { status : 500 })
    }
}

export const POST = async (req : Request) => {
    try {
        await dbConnect()
        const session = await getServerSession(authOptions)
        if(!session) {
            return NextResponse.json({ message : 'אין לך את ההרשאה לבצע פעולה זאת !' } , { status : 401 })
        }
        const { isAdmin } = await UserSchema.findById(session?.user?._id)

        if(!isAdmin) {
            return NextResponse.json({ message : 'אין לך את ההרשאה לבצע פעולה זאת !' } , { status : 401 })
        }

        const body = await req.json()

        const count = await LessonSchema.find()

        await LessonSchema.create({
            ...body,
            order : count.length +1,
        })
        return NextResponse.json({ message : `הוידאו נוסף בהצלחה !` }, { status: 201 });
    } catch (err) {
        return NextResponse.json(`שגיאה בניסיון יצירת שיעור חדש` , { status : 500 })
    }
}

export const PUT = async (req : Request) => {
    try {
        await dbConnect()
        const session = await getServerSession(authOptions)
        if(!session) {
            return NextResponse.json({ message : 'אין לך את ההרשאה לבצע פעולה זאת !' } , { status : 401 })
        }
        const { isAdmin } = await UserSchema.findById(session?.user?._id)

        if(!isAdmin) {
            return NextResponse.json({ message : 'אין לך את ההרשאה לבצע פעולה זאת !' } , { status : 401 })
        }

        const body = await req.json();
        const { newOrder } = body;

        for (let index = 0; index < newOrder.length; index++) {
            const categoryId = newOrder[index];
            await LessonSchema.findByIdAndUpdate(
                categoryId,
                { order: index },
                { new: true }
            );
        }
        return NextResponse.json({ message: 'סדר השיעורים עודכן בהצלחה!' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error || 'שגיאה בלעדכן את סדר השיעורים!' }, { status: 500 });
    }
};