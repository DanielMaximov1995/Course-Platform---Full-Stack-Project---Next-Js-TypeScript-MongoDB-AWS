'use client'
import {useEffect, useState} from 'react'
import {useToast} from "@/components/Toast/ToastContext";
import {useRouter, useSearchParams} from "next/navigation";
import {HomePageType} from "@/types/Home Page";

const AuthError = ({searchParams} : any) => {
    const toast = useToast()
    const router = useRouter()
    // const [error, setError] = useState(searchParams.error);

    // useEffect(() => {
    //     if (searchParams === 'NotExist') {
    //         toast.error('משתמש זה לא קיים!');
    //         router.push('/');
    //     } else if (searchParams) {
    //         toast.error('שגיאה בהתחברות נסו מאוחר יותר !');
    //         router.push('/');
    //     }
    // }, [searchParams]);

    return<></>
}
export default AuthError
