'use client'

import React, {ChangeEvent, FC, useState} from 'react'
import {ContentProps} from "@/types/Layout";
import {useToast} from "@/components/Toast/ToastContext";
import {useRouter} from "next/navigation";
import FirstSection from "@/components/Layout/Site Content/about page sections/First Section";
import SecondSection from "@/components/Layout/Site Content/about page sections/Second Section";
import {updateContentBySlug} from "@/services/fetchData";
import {CustomEvent} from "@/types/others";

const AboutPageContent : FC<ContentProps> = ({ about : aboutContent }) => {
    const [about, setAbout] = useState(aboutContent);
    const toast = useToast()
    const router = useRouter()

    const handleFileToFiles = (index: string, fileUrl: { url: string, fileName: string }) => {
        setAbout(prev => ({
            ...prev,
            [index]: {
                fileName: fileUrl.fileName,
                url: fileUrl.url,
            }
        }))
    }

    const handleAltPic = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setAbout((prev) => ({
            ...prev,
            [name]: {
                ...prev![name as 'pic' | 'pic1' | 'pic2'],
                alt: value,
            },
        }));
    }

    const handleChange = (e: CustomEvent) => {
        const {name, value} = e.target;
        setAbout((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = () => {
        toast.promise(
            () => updateContentBySlug(aboutContent?.slug!, about!),
            {
                progress: "מעדכן את עמוד אודות",
                success: (data: any) => {
                    router.refresh()
                    return data.message;
                },
                error: async (err: any) => {
                    return err.message;
                }
            }
        );
    }

    return (
        <div className='overflow-y-auto py-4'>
            <section className='my-4 border-dashed border-accentBg dark:border-accentSec border-[1px]'>
                <p className='h5 text-center'>חלק 1</p>
                <FirstSection about={about} handleChange={handleChange} handleFileToFiles={handleFileToFiles}
                              handleAltPic={handleAltPic}/>
            </section>
            <section className='my-4 border-dashed border-accentBg dark:border-accentSec border-[1px]'>
                <p className='h5 text-center'>חלק 1</p>
                <SecondSection about={about} handleChange={handleChange}/>
            </section>
            <button onClick={handleSubmit} className='btn w-full bg-accent hover:bg-accent/70 text-[22px] font-semibold'>שמירה</button>
        </div>
    )
}
export default AboutPageContent
