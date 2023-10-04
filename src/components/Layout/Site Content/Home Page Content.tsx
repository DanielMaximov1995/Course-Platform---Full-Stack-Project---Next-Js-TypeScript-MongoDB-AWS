'use client'
import {ChangeEvent, FC, useState} from 'react'
import {ContentProps} from "@/types/Layout";
import FirstSection from "@/components/Layout/Site Content/home page sections/First Section";
import SecondSection from "@/components/Layout/Site Content/home page sections/Second Section";
import ThirdSection from "@/components/Layout/Site Content/home page sections/Third Section";
import FourSection from "@/components/Layout/Site Content/home page sections/Four Section";
import { CustomEvent} from "@/types/others";
import {updateContentBySlug} from "@/services/fetchData";
import {useToast} from "@/components/Toast/ToastContext";
import {useRouter} from "next/navigation";
import SecondSectionTwice from "@/components/Layout/Site Content/home page sections/Four Section Twice";
import FourSectionTwice from "@/components/Layout/Site Content/home page sections/Four Section Twice";

const HomePageContent: FC<ContentProps> = ({home: homeContent}) => {
    const [home, setHome] = useState(homeContent);
    const toast = useToast()
    const router = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setHome((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleFileToFiles = (index: string, fileUrl: { url: string, fileName: string }) => {
        setHome(prev => ({
            ...prev,
            [index]: {
                fileName: fileUrl.fileName,
                url: fileUrl.url,
            }
        }))
    }

    const handleAltPic = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setHome((prev) => ({
            ...prev,
            [name]: {
                ...prev![name as 'pic' | 'pic1' | 'pic2'],
                alt: value,
            },
        }));
    }

    const handleBoxImages = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, id} = e.target;
        setHome(prev => ({
            ...prev,
            boxesWithImage: prev?.boxesWithImage?.map((box, index) =>
                index === parseInt(id) ? {...box, [name]: value} : box
            )
        }))
    }

    const handleFileBoxImages = (id: string, fileUrl: { url: string, fileName: string }) => {
        setHome(prev => ({
            ...prev,
            boxesWithImage: prev?.boxesWithImage?.map((box, index) =>
                index === parseInt(id) ? {...box, pic : {...box.pic, url : fileUrl.url , fileName : fileUrl.fileName }} : box
            )
        }))
    }

    const handleAltBoxImages = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, id} = e.target;
        setHome(prev => ({
            ...prev,
            boxesWithImage: prev?.boxesWithImage?.map((box, index) =>
                index === parseInt(id) ? {...box, pic : {...box.pic, alt : value }} : box
            )
        }))
    }

    const handleAddBoxToImages = () => {
        setHome(prev => ({
            ...prev,
            boxesWithImage: [
                ...prev?.boxesWithImage!, {title: '', subTitle: '', pic: {fileName: '', alt: '', url: ''}}
            ]
        }))
    }

    const handleAddBoxToIcon = () => {
        setHome(prev => ({
            ...prev,
            boxesWithIcon: [
                ...prev?.boxesWithIcon!, {title: '', subTitle: '', icon : ''}
            ]
        }))
    }

    const handleBoxIcons = (e: CustomEvent) => {
        const {name, value, id} = e.target;
        setHome(prev => ({
            ...prev,
            boxesWithIcon: prev?.boxesWithIcon?.map((box, index) =>
                index === parseInt(id) ? {...box, [name]: value} : box
            )
        }))
    }

    const handleSubmit = () => {
        toast.promise(
            () => updateContentBySlug(homeContent?.slug!, home!),
            {
                progress: "מעדכן את עמוד הבית",
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
                <FirstSection home={home} handleChange={handleChange} handleFileToFiles={handleFileToFiles}
                              handleAltPic={handleAltPic}/>
            </section>
            <section className='my-4 border-dashed border-accentBg dark:border-accentSec border-[1px]'>
                <p className='h5 text-center'>חלק 2</p>
                <SecondSection home={home} handleChange={handleChange} handleFileToFiles={handleFileToFiles}
                               handleAltPic={handleAltPic}/>
            </section>
            <section className='my-4 border-dashed border-accentBg dark:border-accentSec border-[1px]'>
                <p className='h5 text-center'>חלק 3</p>
                {
                    home?.boxesWithImage?.length! < 3 &&
                    <>
                        <div className='w-full md:mb-0 p-2'>
                            <button onClick={handleAddBoxToImages} className='btn bg-accent hover:bg-accent/70'>הוסף
                                קוביה חדשה
                            </button>
                        </div>
                    </>
                }
                <ThirdSection home={home} handleAltPic={handleAltBoxImages} handleFileToFiles={handleFileBoxImages} handleChange={handleBoxImages}/>
            </section>
            <section className='my-4 border-dashed border-accentBg dark:border-accentSec border-[1px]'>
                <p className='h5 text-center'>חלק 4</p>
                {
                    home?.boxesWithIcon?.length! < 4 &&
                    <>
                        <div className='w-full md:mb-0 p-2'>
                            <button onClick={handleAddBoxToIcon} className='btn bg-accent hover:bg-accent/70'>הוסף
                                קוביה חדשה
                            </button>
                        </div>
                    </>
                }
                <FourSection home={home} handleChange={handleBoxIcons}/>
                <FourSectionTwice home={home} handleAltPic={handleAltPic} handleFileToFiles={handleFileToFiles} handleChange={handleChange}/>
            </section>
                <button onClick={handleSubmit} className='btn w-full bg-accent hover:bg-accent/70 text-[22px] font-semibold'>שמירה</button>
        </div>
    )
}
export default HomePageContent
