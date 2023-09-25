import { Types } from 'mongoose';

export type UserType = {
    _id ?: Types.ObjectId;
    fName ?: string;
    lName ?: string;
    fullName ?: string;
    email : string;
    isAdmin ?: boolean;
    phone : string;
}

export type LessonType = {
    _id ?: Types.ObjectId;
    title ?: string;
    description ?: string;
    free : boolean;
    video : {
        fileName : string;
        url : string;
        duration : number;
    };
    order : number;
}