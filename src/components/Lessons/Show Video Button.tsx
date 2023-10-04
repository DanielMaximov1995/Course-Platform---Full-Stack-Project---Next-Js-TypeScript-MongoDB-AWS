'use client'

import {useRouter, useSearchParams} from "next/navigation";
import LockIcon from "@/components/Icons/Lock Icon";

const ShowVideoButton = ({order , free , isLoginIn} : { order : number , free : boolean , isLoginIn : boolean}) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const orderNow = searchParams.get('lesson')
    const showLesson = free || isLoginIn

    const handleClick = () => {
        router.push(order === parseInt(orderNow!) ? '/lessons' : `?lesson=${order}`)
    }

    return (
        <div className='py-2 flex justify-end'>
            <button onClick={handleClick} disabled={!showLesson} className={`bg-accent disabled:bg-gray-600 ${showLesson ? 'w-[150px]' : 'w-full'} text-[22px] text-white flex justify-center items-center gap-2`}>
                {!showLesson && <LockIcon/> }
                {showLesson ? "הצג שיעור" : "הרשם/התחבר בשביל לצפות בשיעור" }
            </button>
            {/*{!showLesson && }*/}
        </div>
    )
}
export default ShowVideoButton
