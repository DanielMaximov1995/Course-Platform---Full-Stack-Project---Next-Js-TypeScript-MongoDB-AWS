'use client'

import {ChangeEvent, FormEvent, useState} from "react";
import {contactUsPost, updateContentBySlug} from "@/services/fetchData";
import {useToast} from "@/components/Toast/ToastContext";

const Form = () => {
    const [form, setForm] = useState({
        name : '',
        email : '',
        phone : '',
        text : ''
    });
    const toast = useToast()

    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const phonePattern = /^[\d()\s-]*$/;
            if (!phonePattern.test(value)) {
                return; // Return early if the value doesn't match the pattern
            }
        }

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (!form.text || !form.phone && !form.email) {
            return toast.warning('חובה למלא הודעה או פרטי התקשרות !')
        }

        toast.promise(
            () => contactUsPost(form),
            {
                progress: "שולח את הודעתך",
                success: (data: any) => {
                    return data.message;
                },
                error: async (err: any) => {
                    return err.message;
                }
            }
        );
    }


    return (
        <div className='flex md:w-[60%] flex-wrap -mb-4'>
            <div className='w-full md:mb-0 p-2'>
                <input
                    className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-accentBg text-[18px] pl-10 bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                    placeholder='שם'
                    name='name'
                    value={form.name || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full md:w-1/2 md:mb-0 p-2'>
                <input
                    className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-accentBg text-[18px] pl-10 bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                    placeholder='דואר אלקטרוני'
                    name='email'
                    value={form.email || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full md:w-1/2 md:mb-0 p-2'>
                <input
                    className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-accentBg text-[18px] pl-10 bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                    name='phone'
                    placeholder='נייד'
                    inputMode='tel'
                    value={form.phone || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full md:mb-0 p-2'>
                <textarea
                    className="w-full h-[160px] transition-all duration-300 p-4 rounded-0 text-accentBg text-[18px] pl-10 bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                    placeholder='הודעה'
                    name='text'
                    value={form.text || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full md:mb-0 p-2'>
                <button onClick={handleSubmit} className='bg-accent text-white hover:bg-accent/70 transition-all duration-300 w-full py-2 h-full text-[24px]'>שליחה</button>
            </div>
        </div>
    )
}
export default Form
