import {dbConnect} from "@/utils/dbConnect";
import UserSchema from "@/utils/models/usersModel";
import LessonSchema from "@/utils/models/LessonsModel";
import SiteContentModel from "@/utils/models/SiteContentModel";

export const getSiteContent = async () => {
    await dbConnect()
    const data =  await SiteContentModel.find().maxTimeMS(15000);
    return JSON.parse(JSON.stringify(data))
}

export const getUsers = async () => {
    await dbConnect()
    const data =  await UserSchema.find().maxTimeMS(15000);
    return JSON.parse(JSON.stringify(data))
}

export const getLessons = async () => {
    await dbConnect()
    const data =  await LessonSchema.find().maxTimeMS(15000);
    const dataSorted = data.sort((a , b) => a.order - b.order)
    return JSON.parse(JSON.stringify(dataSorted))
}

export const getLessonByOrder = async (order : number) => {
    await dbConnect()
    const data =  await LessonSchema.findOne({order}).maxTimeMS(15000);
    return JSON.parse(JSON.stringify(data))
}

export const getSiteContentBySlug = async (slug : string) => {
    await dbConnect()
    const data =  await SiteContentModel.findOne({slug}).maxTimeMS(15000);
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