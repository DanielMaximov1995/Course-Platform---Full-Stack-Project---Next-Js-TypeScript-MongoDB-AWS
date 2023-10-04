import {dbConnect} from "@/utils/dbConnect";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {NextResponse} from "next/server";
import UserSchema from "@/utils/models/usersModel";
import SiteContentModel from "@/utils/models/SiteContentModel";


export const GET = async (req : Request , {params} : { params: { slug : string }}) => {
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

        const content = await SiteContentModel.findOne({ slug : params.slug })

        return NextResponse.json(content , { status : 201 })
    } catch (err) {
        return NextResponse.json(`שגיאה בלייבא תוכן` , { status : 500 })
    }
}

export const PUT = async (req : Request , {params} : { params: { slug : string }}) => {
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

        await SiteContentModel.findOneAndUpdate({ slug : params.slug } , body)

        return NextResponse.json({ message : 'התוכן עודכן בהצלחה !' } , { status : 201 })
    } catch (err) {
        return NextResponse.json(`שגיאה בלעדכן תוכן` , { status : 500 })
    }
}