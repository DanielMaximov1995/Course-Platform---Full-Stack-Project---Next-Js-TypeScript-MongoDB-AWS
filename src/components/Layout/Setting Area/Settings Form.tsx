'use client'

import {CustomEvent} from "@/types/others";
import {ChangeEvent, useState , FC} from "react";
import {SettingSiteType} from "@/types/SchemasType";
import InputWithChip from "@/components/Input With Chip";
import ButtonUploadFile from "@/components/Button Upload File";
import ImagesArea from "@/components/Layout/Setting Area/Images Area";
import {updateContentBySlug, updateSettings} from "@/services/fetchData";
import {useToast} from "@/components/Toast/ToastContext";
import {useRouter} from "next/navigation";

const SettingsForm  = ({settingsData} : { settingsData ?: SettingSiteType }) => {
    const [setting, setSetting] = useState<SettingSiteType>(settingsData!);
    const toast = useToast()
    const router = useRouter()

    const handleChange = (e: CustomEvent) => {
        const {name, value} = e.target;
        setSetting((prev : SettingSiteType) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleKeywords = (e : string[]) => {
        setSetting((prev : SettingSiteType) => ({
            ...prev,
            keywords : e,
        }));
    }

    const handleFileToFiles = (index: string, fileUrl: { url: string, fileName: string }) => {
        setSetting((prev : SettingSiteType) => ({
            ...prev,
            [index]: {
                fileName: fileUrl.fileName,
                url: fileUrl.url,
            }
        }))
    }

    const handleAltPic = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setSetting((prev) => ({
            ...prev,
            [name]: {
                ...prev![name as 'logo' | 'logoDark' | 'ogImage'],
                alt: value,
            },
        }));
    }

    const handleSubmit = () => {
        toast.promise(
            () => updateSettings(setting),
            {
                progress: "מעדכן את הגדרות האתר",
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

    console.log(setting)

    return (
        <div className='flex flex-wrap'>
            <div className='w-full md:w-1/2 md:mb-0 p-2'>
                <input
                    className="input"
                    placeholder='שם האתר'
                    name='siteName'
                    value={setting?.siteName || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full md:w-1/2 md:mb-0 p-2'>
                <input
                    className="input"
                    placeholder='תוספת SEO בנוסף לשם אתר'
                    name='titleSeo'
                    value={setting?.titleSeo || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full md:mb-0 p-2'>
                <input
                    className="input"
                    placeholder='כתובת האתר'
                    name='urlSite'
                    value={setting?.urlSite || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full md:mb-0 p-2'>
                <InputWithChip handleChange={handleKeywords} data={setting?.keywords}/>
            </div>
            <div className='w-full md:mb-0 p-2'>
                <textarea
                    className="text-area"
                    placeholder='תיאור SEO'
                    name='descriptionSeo'
                    value={setting?.descriptionSeo || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <ImagesArea setting={setting} handleFileToFiles={handleFileToFiles} handleAltPic={handleAltPic}/>
            <button onClick={handleSubmit} className='btn w-full bg-accent hover:bg-accent/70 text-[22px] font-semibold'>שמירה</button>
        </div>
    )
}
export default SettingsForm
