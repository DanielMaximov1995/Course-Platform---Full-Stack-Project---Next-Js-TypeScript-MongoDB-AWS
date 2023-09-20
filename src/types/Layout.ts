import {ReactNode} from "react";
import { getProviders } from 'next-auth/react'

export type MainLayoutType = {
    children : ReactNode;
}

export type ReactNodeType = {
    children : ReactNode
}

export type ProviderProps = {
    providers : ReturnType<typeof getProviders>
}