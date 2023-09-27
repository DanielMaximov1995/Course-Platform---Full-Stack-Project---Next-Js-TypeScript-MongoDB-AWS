'use client'
import {ChangeEvent, FormEvent, useState} from "react";
import {postNewUser} from "@/services/fetchData";
import {useToast} from '@/components/Toast/ToastContext'
import {useRouter} from "next/navigation";

const AddNewUser = ({handleTabIndex}: { handleTabIndex: (index: number) => void }) => {
    const [newUser, setNewUser] = useState({
        email: '',
        phone: '',
    });
    const toast = useToast()
    const router = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === 'phone') {
            const phonePattern = /^[\d()\s-]*$/;
            if (!phonePattern.test(value)) {
                return;
            }
        }

        setNewUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!newUser.email || !newUser.phone) {
            return toast.warning('חובה לרשום דוא"ל ומספר טלפון')
        }

        toast.promise(
            () => postNewUser(newUser),
            {
                progress: "מוסיף משתמש חדש...",
                success: (data: any) => {
                    router.refresh()
                    handleTabIndex(0)
                    return data.message;
                },
                error: async (err: any) => {
                    return err.message;
                }
            }
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='w-full md:mb-0 p-2'>
                <input
                    className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-accentBg text-[18px] bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                    placeholder='דואר אלקטרוני'
                    name='email'
                    value={newUser.email || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full md:mb-0 p-2'>
                <input
                    className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-accentBg text-[18px] bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                    placeholder='נייד'
                    inputMode='tel'
                    name='phone'
                    value={newUser.phone || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full md:mb-0 p-2'>
                <button type='submit'
                        className='bg-accent text-white hover:bg-accent/70 transition-all duration-300 w-full py-2 h-full text-[24px]'>הוספת
                    משתמש חדש
                </button>
            </div>
        </form>
    )
}
export default AddNewUser
