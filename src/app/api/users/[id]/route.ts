import { NextResponse } from 'next/server'
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import UserSchema from '@/utils/models/usersModel'
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

        const data =  await UserSchema.findById(params.id)
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

        let getUser = await UserSchema.findById(params.id)
        getUser = { ...getUser.toObject(), ...body };

        const data =  await UserSchema.findByIdAndUpdate(params.id , getUser)
        return NextResponse.json({message : 'המשתמש עודכן בהצלחה !'} , { status : 201 })
    } catch (err) {
        return NextResponse.json(`שגיאה בלייבא משתמשים` , { status : 500 })
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

        await UserSchema.findByIdAndRemove(params.id)
        return NextResponse.json({message : 'המשתמש נמחק בהצלחה !'} , { status : 201 })
    } catch (err) {
        console.error(err)
        return NextResponse.json(`שגיאה בלמחוק את המשתמש` , { status : 500 })
    }
}