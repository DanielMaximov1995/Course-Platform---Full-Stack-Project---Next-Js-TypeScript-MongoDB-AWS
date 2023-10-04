'use client'

import HorizontalForm from "@/components/Home Page/Horizontal Form";
import YoutubeIcon from "@/components/Icons/Youtube Icon";
import FacebookIcon from "@/components/Icons/Facebook Icon";
import InstagramIcon from "@/components/Icons/Instagram Icon";
import WhatsappIcon from "@/components/Icons/Whatsapp Icon";
import InboxIcon from "@/components/Icons/Inbox Icon";
import PhoneIcon from "@/components/Icons/Phone Icon";
import {Fragment} from "react";
import TooltipBottom from "@/components/Tooltip Bottom";
import Link from "next/link";
import {useSession} from "next-auth/react";

const socialMedia = [
    { name : 'facebook' , title : 'DVF - עריכת וידאו בכדורגל' , src : 'https://www.facebook.com/DanielVideoFootballers' , icon : <span className='text-[#3b5998]'><FacebookIcon/></span> },
    { name : 'instagram' , title : '@danielvideofootballers' , src : 'https://www.instagram.com/danielvideofootballers' , icon : <span className='text-[#E1306C]'><InstagramIcon/></span> },
    { name : 'whatsapp' , title : 'WhatsApp - עונים 2-4 שעות' , src : 'https://wa.me/972972507255889' , icon : <WhatsappIcon color='success'/> },
    { name : 'email' , title : 'דוא"ל - עונים עד 24 שעות' , src : 'mailto:DanielMaximov2@gmail.com' , icon : <InboxIcon color='warning'/> },
    { name : 'phone' , title : '0507255889' , src : 'tel:972507255889' , icon : <span className='dark:text-accentSec text-accentBg'><PhoneIcon/></span> },
]

const WelcomeLesson = () => {

    let text = "ברוכים הבאים לקורס,\n" +
        "אני מאוד שמח שבחרת להכנס למסע הזה ובחרת בי,\n" +
        "אני בטוח שבשיעור האחרון לאחר שתתרגל/י את מה שלמדת כאן יהיה לך ערך מוסף בתעשיה."

    let secondText = "אפשר לנתב בין החצים ולבחור בשיעור שבו מעוניינים.\n" +
        "בהצלחה !"

    return (
        <div className='text-center'>
            <div>
                <p className='whitespace-pre-wrap text-[24px]'>{text}</p>
                <p className='whitespace-pre-wrap text-[30px] text-accent my-6'>{secondText}</p>
            </div>
        </div>
    )
}
export default WelcomeLesson
