'use client'
import {signIn, signOut, useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {ReactNodeType} from "@/types/Layout";
import AccountIcon from "@/components/Icons/Account Icon";
import GoogleButton from "@/components/Google Button";

const RestrictedAdminContent = ({ children } : ReactNodeType) => {
    const { status, data } = useSession();
    const isLoading = status === 'loading';
    const isAdmin = data?.user.isAdmin


    const router = useRouter();

    if (isLoading) {
        return null
    }

    // Redirect based on conditions
    if (isAdmin) {
        return <>{children}</>;
    } else {
        return null
    }
};

export default RestrictedAdminContent;