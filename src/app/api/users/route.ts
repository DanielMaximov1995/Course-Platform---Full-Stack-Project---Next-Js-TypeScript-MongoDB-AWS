import { NextResponse } from 'next/server'
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import UserSchema from '@/utils/models/usersModel'
import {dbConnect} from "@/utils/dbConnect";

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

        const { email , phone } = await req.json()

        const emailExist = await UserSchema.findOne({email : email.toLowerCase()})
        const phoneExist = await UserSchema.findOne({phone})

        if(emailExist || phoneExist) {
            return NextResponse.json(`הדוא"ל/מס' הטלפון שהקשת כבר קיים` , { status : 401 })
        }

        const newUser =  await UserSchema.create({email : email.toLowerCase() , phone})
        return NextResponse.json(newUser , { status : 201 })
    } catch (err) {
        return NextResponse.json(`שגיאה בניסיון יצירת משתמש חדש` , { status : 500 })
    }
}