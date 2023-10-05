'use client'

import {WhatsappIcon} from "@/components/Icons";
import {useEffect, useState} from "react";

const WhatsAppFloat = () => {
    const [scrollTopExist, setScrollTopExist] = useState(false);

    const handleWhatsAppClick = () => {
        const phoneNumber = '+972507255889'; // Replace this with the recipient's phone number
        const message = 'היי, אשמח לשמוע פרטים נוספים על הקורס !'; // Replace this with your predefined message
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank'); // Open WhatsApp in a new tab or window with the predefined message
    };

    const handleScroll = () => {
        const currentPosition = window.scrollY || window.pageYOffset;
        setScrollTopExist(currentPosition >= 100);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div onClick={handleWhatsAppClick} className={`bg-green-600 cursor-pointer fixed ${scrollTopExist ? "bottom-16" : "bottom-2"} effect right-2 rounded-full p-1`}>
            <WhatsappIcon color='info' fontSize={35}/>
        </div>
    )
}
export default WhatsAppFloat
