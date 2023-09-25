'use client'

import {ChangeEvent, FormEvent, useState} from "react";

const Form = () => {
    const [form, setForm] = useState({
        fullName : '',
        email : '',
        phone : '',
        message : ''
    });

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

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }


    return (
        <form className='flex md:w-[60%] flex-wrap -mb-4' onSubmit={handleSubmit}>
            <div className='w-full md:mb-0 p-2'>
                <input
                    className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-[18px] pl-10 bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                    placeholder='שם'
                    name='fullName'
                    value={form.fullName || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full md:w-1/2 md:mb-0 p-2'>
                <input
                    className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-[18px] pl-10 bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                    placeholder='דואר אלקטרוני'
                    name='email'
                    value={form.email || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full md:w-1/2 md:mb-0 p-2'>
                <input
                    className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-[18px] pl-10 bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                    placeholder='נייד'
                    name='phone'
                    inputMode='tel'
                    value={form.phone || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full md:mb-0 p-2'>
                <textarea
                    className="w-full h-[160px] transition-all duration-300 p-4 rounded-0 text-[18px] pl-10 bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                    placeholder='נייד'
                    name='message'
                    value={form.message || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
        </form>
    )
}
export default Form
