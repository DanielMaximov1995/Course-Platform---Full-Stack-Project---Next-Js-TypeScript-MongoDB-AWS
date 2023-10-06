import {ChangeEvent, ReactNode} from "react";
import { getProviders } from 'next-auth/react'
import {LessonType, SettingSiteType, SiteContentType, UserType} from "@/types/SchemasType";

export type MainLayoutType = {
    children : ReactNode;
}

export type ReactNodeType = {
    children : ReactNode
}

export type ProviderProps = {
    providers : ReturnType<typeof getProviders>
}

export type ImportsTypes = {
    allUsers ?: UserType[] | any;
    allLessons ?: LessonType[] | any;
    allContents ?: SiteContentType[] | any
    settingsData ?: SettingSiteType
}

// the key will be home or about
export type ContentProps = {
    [key: string]: SiteContentType | null;
};

export type SectionsTypeContents = {
    home?: SiteContentType | null;
    about?: SiteContentType | null;
    setting ?: SettingSiteType
    handleChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleFileToFiles?: (index: string, fileUrl: { url: string; fileName: string; }) => void;
    handleAltPic?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type PropsTypes = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}