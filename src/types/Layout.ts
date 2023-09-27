import {ReactNode} from "react";
import { getProviders } from 'next-auth/react'
import {LessonType, UserType} from "@/types/SchemasType";

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
}