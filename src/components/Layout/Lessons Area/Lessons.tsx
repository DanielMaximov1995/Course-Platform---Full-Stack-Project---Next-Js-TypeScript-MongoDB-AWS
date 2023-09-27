'use client'
import moment from 'moment-timezone';
import 'moment/locale/he';
import {useEffect, useState, ChangeEvent, Fragment} from "react";
import {getAllUsers} from "@/services/getData";
import {LessonType, UserType} from "@/types/SchemasType";
import DeleteIcon from "@/components/Icons/Delete Icon";
import UserEdit from "@/components/Layout/Users Area/User Edit";
import EditIcon from "../../Icons/Edit Icon";
import {ImportsTypes} from "@/types/Layout";

const Lessons = ({allLessons : lessons} : ImportsTypes) => {
    const [openAccordionId, setOpenAccordionId] = useState<string | undefined>('');

    const formattedDate = (data : string) => {
        moment.locale('he');
        return moment(data).tz('Asia/Jerusalem').format("DD-MM-YYYY [ביום] dddd");
    };


    return (
        <div className="overflow-x-auto p-2">
            <div className='py-1'>
            </div>
                    <table className="min-w-full overflow-x-auto divide-y divide-gray-200">
                        <thead className="dark:bg-accentSec bg-accentBg">
                        <tr>
                            <th scope="col"
                                className="px-6 py-3 text-right text-[18px] md:text-[22px] font-semibold text-accentSec dark:text-accentBg uppercase tracking-wider">
                                שם פרטי
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-right text-[18px] md:text-[22px] font-semibold text-accentSec dark:text-accentBg uppercase tracking-wider">
                                שם משפחה
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-right text-[18px] md:text-[22px] font-semibold text-accentSec dark:text-accentBg uppercase tracking-wider">
                                דואר אלקטרוני
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-right text-[18px] md:text-[22px] font-semibold text-accentSec dark:text-accentBg uppercase tracking-wider">
                                {"מס' טלפון"}
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-right text-[18px] md:text-[22px] font-semibold text-accentSec dark:text-accentBg uppercase tracking-wider">
                                תאריך הצטרפות
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-right text-[18px] md:text-[22px] font-semibold text-accentSec dark:text-accentBg uppercase tracking-wider">
                                מחיקה
                            </th>
                        </tr>
                        </thead>
                        <tbody className="dark:bg-[#fffaf4] bg-accentBg/60 divide-y divide-gray-200">
                        {
                            lessons.map((lesson : LessonType) => {
                                const lessonIdString = lesson?._id?.toString();
                                return <Fragment key={lessonIdString}>
                                    <tr>
                                        <td className="px-6 py-4 text-accentSec dark:text-accentBg whitespace-nowrap">
                                            {lesson.title}
                                        </td>
                                        <td className="px-6 py-4 text-accentSec dark:text-accentBg whitespace-nowrap">
                                            {lesson.free}
                                        </td>
                                        <td className="px-6 py-4 text-accentSec dark:text-accentBg whitespace-nowrap">
                                            {formattedDate(lesson?.createdAt || '')}
                                        </td>
                                        <td className="px-6 py-4 flex justify-center text-accentSec dark:text-accentBg whitespace-nowrap">
                                            <button
                                                onClick={() => {
                                                    setOpenAccordionId(prev => prev === lessonIdString ? '' : lessonIdString);
                                                }}
                                            >
                                                <EditIcon color='accent' fontSize={30}/>
                                            </button>
                                        </td>
                                    </tr>
                                        <tr className={`transition-all duration-300 ${openAccordionId === lessonIdString ? 'table-row opacity-100' : 'hidden opacity-0'}`}>
                                            <td colSpan={6}>
                                                {/*<UserEdit user={user}/>*/}
                                            </td>
                                        </tr>
                                </Fragment>
                            })
                        }
                        </tbody>
                    </table>
        </div>

    )
}
export default Lessons
