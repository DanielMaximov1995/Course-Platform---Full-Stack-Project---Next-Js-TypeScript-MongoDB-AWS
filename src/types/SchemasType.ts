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

export type LessonFilesType = {
    url ?: Blob | string;
    title ?: string;
    fileName ?: string;
}

export type LessonType = {
    _id ?: Types.ObjectId;
    title ?: string;
    description ?: string;
    free : boolean;
    video : {
        fileName : string;
        url ?: Blob | string;
        duration : number;
    };
    files ?: LessonFilesType[];
    order ?: number;
    createdAt ?: string;
}