'use client'
import {ChangeEvent, FormEvent, Fragment, useEffect, useState} from "react";
import {useToast} from '@/components/Toast/ToastContext'
import {useRouter} from "next/navigation";
import {postNewLesson, removeLessonById, updateLessonById} from "@/services/fetchData";
import ToggleSwitch from "@/components/Toggle Switch";
import {LessonFilesType, LessonType, ObjectIdType} from "@/types/SchemasType";
import ButtonUploadFile from "@/components/Button Upload File";
import AddFileIcon from "@/components/Icons/Add File Icon";
import CloseIcon from "@/components/Icons/Close Icon";

interface LessonCompType  {
    handleTabIndex ?: (index : number) => void;
    lessonData ?: LessonType
}

const options = {
    add: {
        func: (lesson: LessonType) => postNewLesson(lesson),
        progress: "מוסיף שיעור חדש...",
    },
    update: {
        func: (id?: ObjectIdType, lesson?: LessonType) => updateLessonById(id, lesson),
        progress: "מעדכן את השיעור..",
    },
    remove: {
        func: (id?: ObjectIdType) => removeLessonById(id),
        progress: "מוחק את השיעור..",
    },
};

const AddOrEditLesson = ({handleTabIndex , lessonData}: LessonCompType) => {
    const [ lesson , setLesson ] = useState<LessonType>({
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

    useEffect(() => {
        if(lessonData) {
            setLesson(lessonData)
        }
    },[])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        setLesson((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const addNewFile = () => {
        let newObj: LessonFilesType = { url: '', title: '' , fileName : '' };
        setLesson(prev => ({
            ...prev,
            files: [...(prev?.files ?? []), newObj] // Use default empty array if prev?.files is undefined
        }));
    };

    const handleFilesChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { name , value , files} = e.target as any
        let fileData = files?.[0]
        const dataId = e.target.getAttribute('data-id') as any
        setLesson(prev => ({
            ...prev,
            files: prev.files!.map((file, i) =>
                i === parseInt(dataId) ? { ...file, [name]: fileData ? URL.createObjectURL(fileData) : value , fileName : fileData ? fileData.name : '' } : file
            )
        }))
    }

    const handleFileToFiles = (index : string , fileUrl : { url : string , fileName : string }) => {

        setLesson(prev => ({
            ...prev,
            files: prev.files!.map((file, i) =>
                i === parseInt(index) ? { ...file, url : fileUrl.url, fileName : fileUrl.fileName } : file
            )
        }))
    }

    const removeFileFromFiles = (index : number) => {
        setLesson(prev => ({
            ...prev,
            files: lesson.files?.filter((_ , i) => i !== index)
        }))
    }

    const handleVideo = async (number : number ,data : { fileName ?: string , url ?: string , duration ?: number }) => {
            setLesson((prev) => ({
                ...prev,
                video: {
                    ...prev.video,
                    ...data
                },
            }));
    };

    const handleSubmit = (type : 'add' | 'update' | 'remove') => {
        let isRemove = type === 'remove'
        if (!lesson.title || !lesson.description || !lesson.video.url && !isRemove) {
            return toast.warning('חובה למלא את כל הפרטים !')
        }

        const lessonIdString: ObjectIdType | any = lesson?._id?.toString()

        toast.promise(
            () => options[type].func(lessonIdString, lesson),
            {
                progress: options[type].progress,
                success: (data: any) => {
                    if(handleTabIndex) {
                    handleTabIndex(0)
                    }
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
        <div className='w-[600px]'>
            <div className='w-full md:mb-0 p-2'>
                <input
                    className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-accentBg text-[18px] bg-white outline-accent outline outline-1 outline-accent focus:text-accent"
                    placeholder='כותרת שיעור'
                    name='title'
                    value={lesson.title || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full md:mb-0 p-2'>
                <textarea
                    className="text-area"
                    placeholder='תיאור'
                    name='description'
                    value={lesson.description || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className='w-full flex items-center gap-x-2 md:mb-0 p-2'>
                <div className='w-1/2 flex justify-center'>
                    <ButtonUploadFile folder='lessons' urlFile={lesson.video?.url} handleChange={handleVideo} fileName={lesson.video.fileName} htmlForData="upload-For-Video-Lesson" accept='video/*' name='url'/>
                </div>
                <div className='w-1/2 flex justify-center'>
                <p className={`${lessonData ? 'text-accentSec dark:text-accentBg' : 'dark:text-accentSec text-accentBg'}`}>זמן וידאו : {lesson.video.duration}</p>
                </div>
            </div>
            <div className='w-full p-2'>
                <div className={`border-dashed ${lessonData ? "dark:border-accentBg border-accentSec" : "border-accentBg dark:border-accentSec"} border-[1px]`}>
                    <div className='p-2'>
                        <button onClick={addNewFile} className='bg-accent text-white font-semibold text-[20px] px-2'>הוספת קובץ</button>
                    </div>
                    <div className='flex flex-wrap'>
                        {
                            lesson.files!.length > 0 && lesson.files?.map((file , index) => (
                                <div key={index} className='p-2 w-1/2'>
                                    <div className={`border-accentBg dark:border-accentSec ${lessonData ? "dark:border-accentBg border-accentSec" : "border-accentBg dark:border-accentSec"} p-2 border-[1px]`}>
                                        <div>
                                            <button onClick={() => removeFileFromFiles(index)}><CloseIcon color='error'/></button>
                                            <div className='py-2'>
                                                <input
                                                    className="w-full transition-all duration-300 px-2 rounded-0 text-accentBg text-[18px] bg-white outline-accent outline outline-1 focus:text-accent"
                                                    placeholder='כותרת'
                                                    name='title'
                                                    data-id={index.toString()}
                                                    value={file.title || ''}
                                                    onChange={handleFilesChange}
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <ButtonUploadFile urlFile={file.url} folder='assets' fileName={file.fileName} handleChange={handleFileToFiles} htmlForData={`upload-for-file-${index}`} index={index.toString()} name='url'/>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='w-full dark:text-accentSec md:mb-0 px-2 flex justify-start'>
                <ToggleSwitch active={lesson.free} onClick={(newState) => setLesson((prev) => ({ ...prev, free: newState }))}>
                    <span className={`${lessonData ? 'text-accentSec dark:text-accentBg' : 'dark:text-accentSec text-accentBg'}`}>האם זה שיעור חינמי ?</span>
                </ToggleSwitch>
            </div>
            <div className='w-full flex flex-wrap md:mb-0 p-2'>
                <button disabled={!lesson.video.duration} onClick={() => handleSubmit(lessonData ? 'update' : "add")}
                        className='bg-accent text-white hover:bg-accent/70 transition-all duration-300 mb-1 w-full py-2 h-full disabled:pointer-events-none disabled:bg-gray-600 text-[24px]'>
                    שמירה
                </button>
                {
                    lessonData &&
                       <div className='flex justify-center w-full flex-wrap'>
                       <div className='w-full'>
                           <button disabled={!lesson.video.duration} onClick={() => handleSubmit("remove")}
                                   className='bg-red-600 text-white hover:bg-red-600/70 transition-all duration-300 w-full py-2 h-full disabled:pointer-events-none disabled:bg-gray-600 text-[24px]'>
                               מחיקה
                           </button>
                       </div>
                       <div className='w-full'>
                           <p className='m-0 px-2 text-red-300 dark:text-red-600 font-bold text-center'>לאחר לחיצה על מחיקה השיעור ימחק ואיתו כל המידע עליו</p>
                       </div>
                       </div>
                }
            </div>
        </div>
    )
}
export default AddOrEditLesson
