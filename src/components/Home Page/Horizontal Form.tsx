'use client'
import {ChangeEvent, FormEvent, useState} from "react";
import {contactUsPost} from "@/services/fetchData";
import {useToast} from "@/components/Toast/ToastContext";

const HorizontalForm = () => {
    const [form, setForm] = useState({
        name : '',
        email : '',
        phone : '',
    });
    const toast = useToast()

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
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

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!form.phone && !form.email) {
            return toast.warning('חובה למלא פרטי התקשרות !')
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
        <div className='mx-auto'>
            <p className='text-accentBg dark:text-accent text-center text-[20px] font-semibold'>רוצים שנחזור אליכם עם פרטים נוספים?</p>
            <form className='flex flex-wrap -mb-4' onSubmit={handleSubmit}>
                <div className='w-full md:w-1/4 md:mb-0 p-2'>
                    <input
                        className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-[18px] pl-10 bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                        placeholder='שם'
                        name='name'
                        value={form.name || ''}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div className='w-full md:w-1/4 md:mb-0 p-2'>
                    <input
                        className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-[18px] pl-10 bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                        placeholder='דוא"ל'
                        name='email'
                        value={form.email || ''}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div className='w-full md:w-1/4 p-2'>
                    <input
                        className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-[18px] pl-10 bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                        placeholder='נייד'
                        name='phone'
                        type='tel'
                        value={form.phone || ''}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div className='w-full md:w-1/4 p-2'>
                    <button className='bg-accent text-white hover:bg-accent/70 transition-all duration-300 w-full md:w-[200px] h-full text-[24px]'>שליחה</button>
                </div>
                <div className='w-full p-2'>
                    <span className='text-red-600 text-[18px]'>* לא נשתמש בפרטים שלכם לצורכי ספאם.</span>
                </div>
            </form>
        </div>
    )
}
export default HorizontalForm
