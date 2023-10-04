import { NextResponse } from 'next/server'
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import UserSchema from '@/utils/models/usersModel'
import LessonSchema from "@/utils/models/LessonsModel";
import {dbConnect} from "@/utils/dbConnect";

export const GET = async (req : Request , {params} : { params: { id : string }}) => {
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

        const data =  await LessonSchema.findById(params.id)
        return NextResponse.json(data , { status : 201 })
    } catch (err) {
        return NextResponse.json(`שגיאה בלייבא משתמשים` , { status : 500 })
    }
}

export const PUT = async (req : Request , {params} : { params: { id : string }}) => {
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

        await LessonSchema.findByIdAndUpdate(params.id , body)

        return NextResponse.json({message : 'השיעור עודכן בהצלחה !'} , { status : 201 })
    } catch (err) {
        return NextResponse.json(`שגיאה בלעדכן השיעור` , { status : 500 })
    }
}

export const DELETE = async (req : Request ,{params} : { params: { id : string }}) => {
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

        await LessonSchema.findByIdAndRemove(params.id)

        return NextResponse.json({message : 'השיעור נמחק בהצלחה !'} , { status : 201 })
    } catch (err) {
        console.error(err)
        return NextResponse.json(`שגיאה בלמחוק את השיעור` , { status : 500 })
    }
}