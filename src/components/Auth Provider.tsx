'use client'

import {SessionProvider} from "next-auth/react";
import {ReactNodeType} from "@/types/Layout";

const AuthProvider = ({children} : ReactNodeType) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
export default AuthProvider