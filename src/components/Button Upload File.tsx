'use client'
import {ChangeEvent, FC, Fragment, InputHTMLAttributes, ReactNode, useState} from "react";
import {s3} from "@/utils/s3-sdk";
import {getVideoDuration} from "@/utils/get Video Duration";
import AWS from "aws-sdk";
import ProgressBar from "@/components/Progress Bar";
import {LessonFilesType} from "@/types/SchemasType";
import {AddFileIcon, CloseIcon} from "@/components/Icons";

interface ButtonUploadFileProps extends InputHTMLAttributes<HTMLInputElement> {
    titleFile?: string;
    index ?: string
    htmlForData : string
    fileName?: string;
    folder?: string;
    icon?: ReactNode;
    urlFile ?: string | null;
    handleChange ?: any
}


const ButtonUploadFile: FC<ButtonUploadFileProps> = (props) => {
    const {urlFile , folder , fileName , htmlForData, index , icon, handleChange , ...otherProps } = props
    const [progress,  setProgress] = useState<number | null>(null);


    const clearFile = async () => {
        try {
            const baseS3Url = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!!}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/`;
            const fileKey = urlFile!.replace(baseS3Url, '').split("/");

            const encodedKeyParts = fileKey.map((part , index) => index === fileKey.length -1 ? fileName : encodeURIComponent(part))

            const encodedFileKey = encodedKeyParts.join("/");

            const finalFileKey = decodeURIComponent(encodedFileKey);

            const params : AWS.S3.DeleteObjectRequest = {
                Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
                Key: finalFileKey,
            };

            s3.deleteObject(params, (err, data) => {});

            let data: LessonFilesType = {
                duration: 0,
                url: '',
                fileName: '',
            };

            if (index !== undefined) {
                await handleChange(index, data);
            } else {
                await handleChange(undefined, data);
            }

            setProgress(null);
        } catch (error) {
            console.error("Error deleting file from S3:", error);
        }
    };



    const newFile = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (file) {
                let data: LessonFilesType = {
                    url : '',
                    fileName : ''
                }

                let duration = await getVideoDuration(URL.createObjectURL(file) , file.type.includes('video'))
                if(duration > 0) {
                    data = {
                        ...data,
                        duration
                    }
                }

                const params : AWS.S3.PutObjectRequest = {
                    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!!,
                    Key: folder ? `${folder}/${file.name}` : file.name,
                    Body: file,
                }

                const upload = s3.upload(params);

                upload.on('httpUploadProgress', (progress) => {
                    let processBar = (progress.loaded / progress.total) * 100
                    setProgress(processBar)
                });

                const uploadFile = await upload.promise();

                data = {
                    ...data,
                    url : uploadFile.Location,
                    fileName : file.name
                }

                if(index) {
                    handleChange(index , data)
                } else {
                    handleChange(undefined , data)
                }
            }
        } catch (err) {
            console.error('Error reading file:', err);
        }
    }

    return (
        <div className='flex flex-wrap w-full h-22 overflow-x-hidden rounded-r-md max-h-max'>
            <div className='w-full flex h-12 border border-[1px] border-accent relative'>
                {
                    urlFile ? <Fragment>
                            <button onClick={clearFile} className='bg-white w-full h-full flex gap-x-2 items-center text-accentBg my-0 pr-1'>
                                <CloseIcon fontSize={30} color='error'/>
                                <p>{ fileName }</p>
                            </button>
                        </Fragment> :
                        <Fragment>
                            <label htmlFor={htmlForData} className='text-[16px] flex items-center px-2 h-auto bg-accent dark:bg-accent text-accentBg'>
                                <span><AddFileIcon/></span>
                            </label>
                            <input
                                id={htmlForData}
                                data-id={index}
                                {...otherProps}
                                hidden
                                onChange={newFile}
                                type="file"
                            />
                            <label htmlFor={htmlForData} className='bg-white w-full h-full flex items-center text-accentBg my-0 pr-1 text-[14px]'>
                                לא נבחר קובץ
                            </label>
                        </Fragment>
                }
            </div>
            {
                progress && !urlFile &&
                <div className='w-full'>
                    <ProgressBar value={progress}/>
                </div>
            }
        </div>
    )
}
export default ButtonUploadFile
