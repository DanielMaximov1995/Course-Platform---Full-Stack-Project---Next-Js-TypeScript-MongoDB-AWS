import {dbConnect} from "@/utils/dbConnect";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import UserSchema from "@/utils/models/usersModel";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {uploadFileToFolderS3} from "@/utils/aws-sdk";
import {NextRequest} from "next/server.js";

export const POST = async (req: NextRequest) => {
    try {
        const searchParams = req.nextUrl.searchParams
        const folder = searchParams.get('folder')
        await dbConnect()
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({message: 'אין לך את ההרשאה לבצע פעולה זאת !'}, {status: 401})
        }
        const {isAdmin} = await UserSchema.findById(session?.user?._id)

        if (!isAdmin) {
            return NextResponse.json({message: 'אין לך את ההרשאה לבצע פעולה זאת !'}, {status: 401})
        }


        const data = await req.formData()
        console.log(data)
        const file : File | null = data.get('file') as unknown as File

        console.log(file)

        const url = await uploadFileToFolderS3(file, folder)

        return NextResponse.json(url, {status: 201});
    } catch (err) {
        console.error(err)
        return NextResponse.json(`שגיאה בניסיון יצירת שיעור חדש`, {status: 500})
    }
}