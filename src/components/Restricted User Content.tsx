'use client'
import {signIn, signOut, useSession} from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {ReactNodeType} from "@/types/Layout";
import AccountIcon from "@/components/Icons/Account Icon";
import GoogleButton from "@/components/Google Button";

const RestrictedUserContent = ({ children } : ReactNodeType) => {
    const { status, data } = useSession();
    const isLoading = status === 'loading';
    const isLoggedIn = status === 'authenticated';

    const router = useRouter();

    if (isLoading) {
        return null
    }


    // Redirect based on conditions
    if (isLoggedIn) {
        return <>{children}</>;
    }  else {
        return <div className='mx-auto justify-center flex flex-wrap'>
            <p className='text-accentSec dark:text-accentBg text-center text-[20px]'>אינך מחובר למשתמש</p>
            <GoogleButton onClick={() => signIn('google')}/>
        </div>
    }
};

export default RestrictedUserContent;