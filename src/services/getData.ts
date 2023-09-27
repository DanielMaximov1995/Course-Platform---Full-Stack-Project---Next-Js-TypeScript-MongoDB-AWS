import {dbConnect} from "@/utils/dbConnect";
import UserSchema from "@/utils/models/usersModel";
import LessonSchema from "@/utils/models/LessonsModel";

export const getUsers = async () => {
    await dbConnect()
    const data =  await UserSchema.find().maxTimeMS(15000);
    return JSON.parse(JSON.stringify(data))
}

export const getLessons = async () => {
    await dbConnect()
    const data =  await LessonSchema.find().maxTimeMS(15000);
    return JSON.parse(JSON.stringify(data))
}

export const getAllUsers = async () => {
    let resp = await fetch(`/api/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!resp.ok) {
        let err = await resp.json();
        throw(err);
    }
    return resp.json();
}