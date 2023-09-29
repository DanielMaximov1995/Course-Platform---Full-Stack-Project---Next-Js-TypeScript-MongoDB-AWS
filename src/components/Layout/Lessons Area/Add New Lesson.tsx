'use client'
import {ChangeEvent, FormEvent, useState} from "react";
import {useToast} from '@/components/Toast/ToastContext'
import {useRouter} from "next/navigation";
import {getVideoDuration} from "@/utils/get Video Duration";
import {postNewLesson} from "@/services/fetchData";
import ToggleSwitch from "@/components/Toggle Switch";
import {LessonFilesType, LessonType} from "@/types/SchemasType";
import ButtonUploadFile from "@/components/Button Upload File";
import AddFileIcon from "@/components/Icons/Add File Icon";



const AddNewLesson = ({handleTabIndex}: { handleTabIndex: (index: number) => void }) => {
    const [newLesson, setNewLesson] = useState<LessonType>({
        title : '',
        description : '',
        free : false,
        video : {
            fileName : '',
            url : '',
            duration : 0
        },
        files : []
    });
    const toast = useToast()
    const router = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        if (name === 'phone') {
            const phonePattern = /^[\d()\s-]*$/;
            if (!phonePattern.test(value)) {
                return;
            }
        }

        setNewLesson((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const addNewFile = () => {
        let newObj: LessonFilesType = { url: '', title: '' , fileName : '' };
        setNewLesson(prev => ({
            ...prev,
            files: [...(prev?.files ?? []), newObj] // Use default empty array if prev?.files is undefined
        }));
    };

    const handleFilesChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { name , value , files} = e.target as any
        let fileData = files?.[0]
        const dataId = e.target.getAttribute('data-id') as any
        setNewLesson(prev => ({
            ...prev,
            files: prev.files!.map((file, i) =>
                i === parseInt(dataId) ? { ...file, [name]: fileData ? URL.createObjectURL(fileData) : value , fileName : fileData ? fileData.name : '' } : file
            )
        }))
    }

    const handleVideo = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        try {
            if(!file) {
                return null
            }
            let duration =  await getVideoDuration(URL.createObjectURL(file));
            setNewLesson((prev) => ({
                ...prev,
                video: {
                    ...prev.video,
                    fileName : file.name,
                    url : URL.createObjectURL(file),
                    duration: duration || 0,
                },
            }));
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };


    const handleSubmit = () => {
        if (!newLesson.title || !newLesson.description || !newLesson.video.url) {
            return toast.warning('חובה למלא את כל הפרטים !')
        }

        toast.promise(
            () => postNewLesson(newLesson),
            {
                progress: "מוסיף שיעור חדש...",
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
        <div className='w-[600px]'>
            <div className='w-full md:mb-0 p-2'>
                <input
                    className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-accentBg text-[18px] bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                    placeholder='כותרת שיעור'
                    name='title'
                    value={newLesson.title || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full md:mb-0 p-2'>
                <textarea
                    className="w-full h-[160px] transition-all duration-300 p-4 rounded-0 text-accentBg text-[18px] bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                    placeholder='תיאור'
                    name='description'
                    value={newLesson.description || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full flex items-center gap-x-2 md:mb-0 p-2'>
                <ButtonUploadFile fileName={newLesson.video.fileName} onChange={handleVideo} name='url' icon={<AddFileIcon/>}/>
                    {/*<input type="file" accept="video/*" onChange={handleVideo}/>*/}
                <p>זמן וידאו : {newLesson.video.duration}</p>
            </div>
            <div className='w-full p-2'>
                <div className='border-accentBg dark:border-accentSec border-dashed border-[1px]'>
                    <div className='p-2'>
                        <button onClick={addNewFile} className='bg-accent dark:bg-accentSec dark:text-accentBg text-accentSec font-semibold text-[20px] px-2'>הוספת קובץ</button>
                    </div>
                    <div className='flex flex-wrap'>
                        {
                            newLesson.files!.length > 0 && newLesson.files?.map((file , index) => (
                                <div key={index} className='p-2 w-1/2 md:w-1/3'>
                                    <div className='border-accentBg dark:border-accentSec p-2 border-[1px]'>
                                        <div className=''>
                                            <ButtonUploadFile fileName={file.fileName} onChange={handleFilesChange} index={index.toString()} name='url' icon={<AddFileIcon/>}/>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='w-full md:mb-0 px-2 flex justify-start'>
                <ToggleSwitch active={newLesson.free} onClick={(newState) => setNewLesson((prev) => ({ ...prev, free: newState }))}>
                    האם זה שיעור חינמי ?
                </ToggleSwitch>
            </div>
            <div className='w-full md:mb-0 p-2'>
                <button disabled={!newLesson.video.duration} onClick={handleSubmit}
                        className='bg-accent text-white hover:bg-accent/70 transition-all duration-300 w-full py-2 h-full disabled:pointer-events-none disabled:bg-gray-600 text-[24px]'>הוספת
                    שיעור חדש
                </button>
            </div>
        </div>
    )
}
export default AddNewLesson
