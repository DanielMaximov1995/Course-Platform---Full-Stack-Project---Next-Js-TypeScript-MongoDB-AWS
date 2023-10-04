'use client'

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {CustomEvent} from "@/types/others";

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

type PropsTypes = {
    handleChange?: (e: string) => void;
    value ?:string
}

const RichText = ({handleChange , value} : PropsTypes) => {
    const [content, setContent] = useState(value);



    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ align: [] }],
            [{ color: [] }],
            ['code-block'],
            ['clean'],
        ],
    };


    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'align',
        'color',
        'code-block',
    ];

    const handleEditorChange = (newContent : string) => {
        setContent(newContent);
        if (handleChange) {
            handleChange(newContent)
        }
    };

    return <QuillEditor
        value={content}
        onChange={handleEditorChange}
        modules={quillModules}
        formats={quillFormats}
        className="w-full h-[70%] bg-white text-primary text-right"
    />
}
export default RichText
