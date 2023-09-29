import {dbConnect} from "@/utils/dbConnect";
import { NextResponse } from 'next/server'
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import LessonSchema from "@/utils/models/LessonsModel";
import UserSchema from "@/utils/models/usersModel";
import {uploadFileToFolderS3} from "../../../utils/aws-sdk";
// import {uploadFileToFolder} from "@/utils/cloudinary-cloud-storage";

export const GET = async () => {
    try {
        await dbConnect()
        const session = await getServerSession(authOptions)
        if(!session) {
            return NextResponse.json({ message : 'אין לך את ההרשאה לבצע פעולה זאת !' } , { status : 401 })
        }
        const { isAdmin } = await LessonSchema.findById(session?.user?._id)
        if(!isAdmin) {
            return NextResponse.json({ message : 'אין לך את ההרשאה לבצע פעולה זאת !' } , { status : 401 })
        }

        const data =  await LessonSchema.find()
        return NextResponse.json(data , { status : 201 })
    } catch (err) {
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

        const uploadVideo = await uploadFileToFolderS3(body.video.url , 'lessons' ,body.video.fileName )

        let files = []


        if(body?.files.length > 0) {
            for (let i = 0; i < body.files.length; i++) {
                let file  = body.files[i]
                let url = await uploadFileToFolderS3(file.url , 'assets' , file.fileName)
                files.push({
                    fileName : file.fileName,
                    title : file.title,
                    url
                })
            }
        } else {
            files = []
        }

        const count = await LessonSchema.find()

        await LessonSchema.create({
            ...body,
            video : {
                fileName : body.video.fileName,
                url : uploadVideo,
                duration : body.video.duration
            },
            order : count.length +1
        })
        return NextResponse.json({ message : `הוידאו נוסף בהצלחה !` }, { status: 201 });
    } catch (err) {
        return NextResponse.json(`שגיאה בניסיון יצירת שיעור חדש` , { status : 500 })
    }
}