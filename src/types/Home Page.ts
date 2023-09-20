import {ReactNode} from "react";
import { getProviders } from 'next-auth/react'

export type HomePageType = {
    searchParams ?: { [key: string]: string | string[] | undefined };
    params ?: { [key: string]: string | string[] | undefined };
}

export type ReactNodeType = {
    children : ReactNode
}