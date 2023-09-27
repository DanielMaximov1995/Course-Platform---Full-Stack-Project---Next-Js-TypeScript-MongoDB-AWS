'use client'

import {UserType} from "@/types/SchemasType";
import {ChangeEvent, useEffect, useState} from "react";
import ToggleSwitch from "@/components/Toggle Switch";
import {removeUserById, updateUserById} from "@/services/fetchData";
import {useToast} from "@/components/Toast/ToastContext";
import {useRouter} from "next/navigation";

const options = {
    delete : { func : (id : string) => removeUserById(id) , progress : 'מוחק את המשתמש...' },
    update : { func : (id : string , data : UserType) => updateUserById(id , data) , progress : 'מעדכן את הפוסט..' },
}

const UserEdit = ({user} : {user : UserType}) => {
    const [update, setUpdate]  = useState<UserType>(user);
    const fullName = `${user.fName} ${user.lName}`;
    const router = useRouter()
    const toast = useToast()
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === 'phone') {
            const phonePattern = /^[\d()\s-]*$/;
            if (!phonePattern.test(value)) {
                return;
            }
        }

        setUpdate((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleUpdateOrDeleteUser = (type: 'delete' | 'update') => {
            toast.promise(
                () => options[type].func(user._id!.toString(), update),
                {
                    progress: options[type].progress,
                    success: (data: any) => {
                        router.push('./');
                        router.refresh();
                        return data.message;
                    },
                    error: async (err: any) => {
                        return err.message;
                    },
                }
            );
    }


    return (
        <div className='w-[50%] md:w-[60%] md:mx-auto'>
            <p className='text-center text-[22px] text-accentSec dark:text-accentBg'>{user.fName ? fullName : user.email}</p>
            <div className='flex-wrap flex'>
                <div className='w-full md:w-1/2 md:mb-0 p-2'>
                    <input
                        className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-accentBg text-[18px] bg-white outline-accent outline outline-1 focus:outline-accent focus:text-accent"
                        placeholder='שם פרטי'
                        name='fName'
                        value={update.fName || ''}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div className='w-full md:w-1/2 md:mb-0 p-2'>
                    <input
                        className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-accentBg text-[18px] bg-white outline-accent outline outline-1 focus:outline-accent focus:text-accent"
                        placeholder='שם משפחה'
                        name='lName'
                        value={update.lName || ''}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div className='w-full md:w-1/2 md:mb-0 p-2'>
                    <input
                        className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-accentBg text-[18px] bg-white outline-accent outline outline-1 focus:outline-accent focus:text-accent"
                        placeholder='דואר אלקטרוני'
                        name='email'
                        value={update.email || ''}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div className='w-full md:w-1/2 md:mb-0 p-2'>
                    <input
                        className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-accentBg text-[18px] bg-white outline-accent outline outline-1 focus:outline-accent focus:text-accent"
                        placeholder='נייד'
                        inputMode='tel'
                        name='phone'
                        value={update.phone || ''}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div className='w-full md:mb-0 px-2 flex justify-center'>
                    <ToggleSwitch active={update.isAdmin} onClick={(newState) => setUpdate((prev) => ({ ...prev, isAdmin: newState }))}>
                        האם המשתמש/ת מנהל/ת ?
                    </ToggleSwitch>
                </div>
                <div className='flex w-full justify-between'>
                    <div className='w-full p-2'>
                    <button onClick={() => handleUpdateOrDeleteUser('update')} className='w-full text-[22px] bg-green-600 hover:bg-green-500 transition-all duration-300 text-white m-1'>שמירה</button>
                    </div>
                    <div className='w-full p-2'>
                        <button onClick={() => handleUpdateOrDeleteUser('delete')} className='w-full text-[22px] bg-red-600 hover:bg-red-500 transition-all duration-300 text-white m-1'>מחיקה</button>
                        <p className='m-0 px-2 text-red-600 text-center'>לאחר לחיצה על מחיקה המשתמש ימחק ואיתו כל המידע עליו</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserEdit
