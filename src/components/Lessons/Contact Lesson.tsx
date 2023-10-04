'use client'

import HorizontalForm from "@/components/Home Page/Horizontal Form";
import {Fragment} from "react";
import TooltipBottom from "@/components/Tooltip Bottom";
import Link from "next/link";
import {FacebookIcon, InboxIcon, InstagramIcon, PhoneIcon, WhatsappIcon} from "@/components/Icons";

const socialMedia = [
    { name : 'facebook' , title : 'DVF - עריכת וידאו בכדורגל' , src : 'https://www.facebook.com/DanielVideoFootballers' , icon : <span className='text-[#3b5998]'><FacebookIcon/></span> },
    { name : 'instagram' , title : '@danielvideofootballers' , src : 'https://www.instagram.com/danielvideofootballers' , icon : <span className='text-[#E1306C]'><InstagramIcon/></span> },
    { name : 'whatsapp' , title : 'WhatsApp - עונים 2-4 שעות' , src : 'https://wa.me/972972507255889' , icon : <WhatsappIcon color='success'/> },
    { name : 'email' , title : 'דוא"ל - עונים עד 24 שעות' , src : 'mailto:DanielMaximov2@gmail.com' , icon : <InboxIcon color='warning'/> },
    { name : 'phone' , title : '0507255889' , src : 'tel:972507255889' , icon : <span className='dark:text-accentSec text-accentBg'><PhoneIcon/></span> },
]

const ContactLesson = ({order} : { order ?: number }) => {

    let checkOrder = order !== null && order! === 0 ? "נהניתם מהשיעור? רוצים ללמוד עוד?" : !order ? "אנא התחברו כדי לגשת לקורס" : "אין גישה לשיעור זה ללא התחברות"

    return (
        <div className='text-center'>
            <p className='h4'>{checkOrder}</p>
            <HorizontalForm/>
            <p className='h4'>או שתצרו איתנו קשר:</p>
            <div className='flex gap-x-2 justify-center'>
                {
                    socialMedia.map((social , index) => (
                        <Fragment key={index}>
                            <TooltipBottom title={social.title}>
                                <Link className='text-[40px]' href={social.src} target='_blank'>
                                    {social.icon}
                                </Link>
                            </TooltipBottom>
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}
export default ContactLesson
