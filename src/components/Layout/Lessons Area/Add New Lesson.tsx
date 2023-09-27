'use client'
import {ChangeEvent, FormEvent, useState} from "react";
import {useToast} from '@/components/Toast/ToastContext'
import {useRouter} from "next/navigation";
import {getVideoDuration} from "@/utils/get Video Duration";
import {postNewLesson, postNewUser} from "@/services/fetchData";
import ToggleSwitch from "@/components/Toggle Switch";



const AddNewLesson = ({handleTabIndex}: { handleTabIndex: (index: number) => void }) => {
    const [newLesson, setNewLesson] = useState({
        title : '',
        description : '',
        free : false,
        video : {
            fileName : '',
            url : '',
            duration : 0
        },
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

    const handleVideo = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            try {
                // Convert the File to a data URL
                const reader = new FileReader();
                reader.onload = async (event) => {
                    if (event.target) {
                        const dataUrl = event.target.result as string;

                        try {
                            const duration = await getVideoDuration(dataUrl);

                            setNewLesson((prev) => ({
                                ...prev,
                                video: {
                                    ...prev.video,
                                    fileName: file.name,
                                    duration: duration || 0,
                                    url: dataUrl,
                                },
                            }));
                        } catch (error) {
                            console.error('Error getting video duration:', error);
                        }
                    }
                };

                reader.readAsDataURL(file);
            } catch (error) {
                console.error('Error reading file:', error);
            }
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
                    <input type="file" accept="video/*" onChange={handleVideo}/>
                <p>זמן וידאו : {newLesson.video.duration}</p>
            </div>
            <div className='w-full md:mb-0 px-2 flex justify-start'>
                <ToggleSwitch active={newLesson.free} onClick={(newState) => setNewLesson((prev) => ({ ...prev, free: newState }))}>
                    האם זה שיעור חינמי ?
                </ToggleSwitch>
            </div>
            <div className='w-full md:mb-0 p-2'>
                <button onClick={handleSubmit}
                        className='bg-accent text-white hover:bg-accent/70 transition-all duration-300 w-full py-2 h-full text-[24px]'>הוספת
                    שיעור חדש
                </button>
            </div>
        </div>
    )
}
export default AddNewLesson
