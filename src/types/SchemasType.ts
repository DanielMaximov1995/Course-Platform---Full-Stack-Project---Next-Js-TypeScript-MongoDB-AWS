import { Types } from 'mongoose';

export type ObjectIdType = Types.ObjectId | string | undefined;

type LessonsCompletedType = {
    [key: string]: boolean;
};

export type UserType = {
    _id?: ObjectIdType;
    fName?: string;
    lName?: string;
    fullName?: string;
    email?: string;
    isAdmin?: boolean;
    phone?: string;
    createdAt ?: string;
    lessonsCompleted ?: LessonsCompletedType
};

export type LessonFilesType = {
    _id ?: ObjectIdType;
    url ?: string;
    title ?: string;
    fileName ?: string;
    duration ?: number
}

export type LessonType = {
    _id ?: ObjectIdType;
    title ?: string;
    description ?: string;
    free : boolean;
    video : LessonFilesType;
    files ?: LessonFilesType[];
    order ?: number;
    createdAt ?: string;
}

export type BoxesWithImageType = {
    _id ?: ObjectIdType;
    title?: string;
    subTitle?: string;
    pic?: {
        fileName?: string;
        url?: string;
        alt ?: string;
    };
}

export type BoxesWithIconType = {
    _id ?: ObjectIdType;
    title?: string;
    subTitle?: string;
    icon ?: string
}

export type SiteContentType = {
    _id ?: ObjectIdType;
    slug?: string;
    title?: string;
    subTitle?: string;
    text?: string;
    pic?: {
        fileName?: string;
        alt ? : string;
        url?: string;
    };
    title1?: string;
    subTitle1?: string;
    text1?: string;
    pic1?: {
        fileName?: string;
        alt ?: string;
        url?: string;
    };
    boxesWithImage?: BoxesWithImageType[];
    boxesWithIcon?: BoxesWithIconType[];
    title2?: string;
    subTitle2?: string;
    pic2?: {
        fileName?: string;
        alt ? : string;
        url?: string;
    };
}

export type SettingSiteType = {
    slug : string;
    siteName ?: string,
    titleSeo ?: string,
    descriptionSeo ?: string,
    urlSite ?: string,
    keywords ?: string[],
    logo ?: {
        fileName ?: string,
        alt ?: string,
        url ?: string,
    },
    logoDark ?: {
        fileName ?: string,
        alt ?: string,
        url ?: string,
    },
    ogImage ?: {
        fileName ?: string,
        alt ?: string,
        url ?: string,
    },
    icon ?: {
        fileName ?: string,
        url ?: string,
    },
}