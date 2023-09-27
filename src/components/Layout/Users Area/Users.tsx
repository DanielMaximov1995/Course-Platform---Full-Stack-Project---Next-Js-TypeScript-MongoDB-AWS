'use client'
import moment from 'moment-timezone';
import 'moment/locale/he';
import {useEffect, useState, ChangeEvent, Fragment} from "react";
import {getAllUsers} from "@/services/getData";
import {UserType} from "@/types/SchemasType";
import DeleteIcon from "@/components/Icons/Delete Icon";
import UserEdit from "@/components/Layout/Users Area/User Edit";
import EditIcon from "../../Icons/Edit Icon";

const Users = ({allUsers : users} : { allUsers : UserType[] }) => {
    const [filter, setFilter] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
    const [openAccordionId, setOpenAccordionId] = useState<string | undefined>('');


    useEffect(() => {
            setFilteredUsers(users)
    }, [users]);


    const formattedDate = (data : string) => {
        moment.locale('he');
        return moment(data).tz('Asia/Jerusalem').format("DD-MM-YYYY [ביום] dddd");
    };

    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setFilter(query);

        const filtered = users.filter((user) => {
            const fullName = `${user.fName} ${user.lName}`;
            return (
                fullName.toLowerCase().includes(query.toLowerCase()) ||
                user.email!.toLowerCase().includes(query.toLowerCase()) ||
                user.phone!.includes(query)
            );
        });
        setFilteredUsers(filtered);
    };

    return (
        <div className="overflow-x-auto p-2">
            <div className='py-1'>
                <input
                    className="w-full h-[60px] transition-all duration-300 px-4 rounded-0 text-[18px] pl-10 bg-white outline-accent outline outline-1 dark:outline-transparent focus:outline-accent focus:text-accent"
                    placeholder="חפש לפי שם, אימייל או מס' טלפון..."
                    value={filter}
                    onChange={handleFilterChange}
                    autoComplete="off"
                />
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
                            filteredUsers.map((user) => {
                                const userIdString = user?._id?.toString();
                                return <Fragment key={userIdString}>
                                    <tr>
                                        <td className="px-6 py-4 text-accentSec dark:text-accentBg whitespace-nowrap">
                                            {user.fName}
                                        </td>
                                        <td className="px-6 py-4 text-accentSec dark:text-accentBg whitespace-nowrap">
                                            {user.lName}
                                        </td>
                                        <td className="px-6 py-4 text-accentSec dark:text-accentBg whitespace-nowrap">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 text-accentSec dark:text-accentBg whitespace-nowrap">
                                            {user.phone}
                                        </td>
                                        <td className="px-6 py-4 text-accentSec dark:text-accentBg whitespace-nowrap">
                                            {formattedDate(user?.createdAt || '')}
                                        </td>
                                        <td className="px-6 py-4 flex justify-center text-accentSec dark:text-accentBg whitespace-nowrap">
                                            <button
                                                onClick={() => {
                                                    setOpenAccordionId(prev => prev === userIdString ? '' : userIdString);
                                                }}
                                            >
                                                <EditIcon color='accent' fontSize={30}/>
                                            </button>
                                        </td>
                                    </tr>
                                        <tr className={`transition-all duration-300 ${openAccordionId === userIdString ? 'table-row opacity-100' : 'hidden opacity-0'}`}>
                                            <td colSpan={6}>
                                                <UserEdit user={user}/>
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
export default Users
