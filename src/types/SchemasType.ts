import { Types } from 'mongoose';

export type UserType = {
    _id?: Types.ObjectId;
    fName?: string;
    lName?: string;
    fullName?: string;
    email?: string;
    isAdmin?: boolean;
    phone?: string;
    createdAt ?: string;
    lessonsCompleted ?: {
        1 : boolean,
        2 : boolean,
        3 : boolean,
        4 : boolean,
        5 : boolean,
    };
};

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
    order ?: number;
    createdAt ?: string;
}