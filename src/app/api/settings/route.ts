import {dbConnect} from "@/utils/dbConnect";
import { NextResponse } from 'next/server'
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import UserSchema from "@/utils/models/usersModel";
import SettingModel from "@/utils/models/SettingModel";
import {SettingSiteType} from "@/types/SchemasType";

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

        const data =  await SettingModel.findOne()
        return NextResponse.json(data , { status : 201 })
    } catch (err) {
        return NextResponse.json(`שגיאה בלייבא משתמשים` , { status : 500 })
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

        let getSetting =  await SettingModel.findOne()
        const body = await req.json()

        if(!getSetting) {
            return NextResponse.json(`שגיאה בלעדכן הגדרות` , { status : 500 })
        }
        getSetting = Object.assign(getSetting, body);

        await getSetting.save()
        return NextResponse.json({ message : `ההגדות התעדכנו בהצלחה !` } , { status : 201 })
    } catch (err) {
        console.error(err)
        return NextResponse.json(`שגיאה בלעדכן הגדרות` , { status : 500 })
    }
}