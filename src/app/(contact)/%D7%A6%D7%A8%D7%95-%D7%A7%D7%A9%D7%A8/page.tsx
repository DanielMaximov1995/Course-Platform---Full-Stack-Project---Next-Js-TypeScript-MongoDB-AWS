import Link from 'next/link'
import dynamicNext from 'next/dynamic';
const Form = dynamicNext(() => import("@/components/Contact/Form"))
import {Fragment} from "react";
import TooltipBottom from "@/components/Tooltip Bottom";
import {PropsTypes} from "@/types/Layout";
import {FacebookIcon, InboxIcon, InstagramIcon, PhoneIcon, WhatsappIcon, YoutubeIcon} from "@/components/Icons";

const socialMedia = [
    { name : 'youtube' , title : 'DVF - עריכת וידאו בכדורגל' , src : 'https://www.youtube.com/@dvf-3182' , icon : <YoutubeIcon color={"error"}/> },
    { name : 'facebook' , title : 'DVF - עריכת וידאו בכדורגל' , src : 'https://www.facebook.com/DanielVideoFootballers' , icon : <span className='text-[#3b5998]'><FacebookIcon/></span> },
    { name : 'instagram' , title : '@danielvideofootballers' , src : 'https://www.instagram.com/danielvideofootballers' , icon : <span className='text-[#E1306C]'><InstagramIcon/></span> },
    { name : 'whatsapp' , title : 'WhatsApp - עונים 2-4 שעות' , src : 'https://wa.me/972972507255889' , icon : <WhatsappIcon color='success'/> },
    { name : 'email' , title : 'דוא"ל - עונים עד 24 שעות' , src : 'mailto:DanielMaximov2@gmail.com' , icon : <InboxIcon color='warning'/> },
    { name : 'phone' , title : '0507255889' , src : 'tel:972507255889' , icon : <span className='dark:text-accentSec text-accentBg'><PhoneIcon/></span> },
]

export const generateMetadata = async ({ params, searchParams } : PropsTypes)  => {
    return {
        title : 'צרו קשר'
    }
}

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
      <main className="flex h-auto w-[90%] mx-auto flex-col items-center justify-between pt-16">
      <h1 className='h2 border-x-[4px] border-accentBg dark:border-accent px-6 md:px-20 mt-20 rounded-xl text-accentBg dark:text-accent'>צרו קשר</h1>
          <p className='py-2 text-center text-[18px]'>אנו נשמח לענות לשאלות שלכם בכל דרך שבה תבחרו ליצור איתנו קשר. אנו זמינים לשאלות בכל נושא.</p>
          <Form/>
          <div className='flex justify-center py-6'>
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
    </main>
  )
}
