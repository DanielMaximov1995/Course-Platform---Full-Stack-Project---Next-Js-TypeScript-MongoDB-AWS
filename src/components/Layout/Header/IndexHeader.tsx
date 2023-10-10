'use client'
import Image from "next/image";
import Link from "next/link";
import {useSession , signIn , signOut} from 'next-auth/react'
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import AuthError from "@/components/Home Page/AuthError";
import {ImportsTypes} from "@/types/Layout";
import {useTheme} from "next-themes";
import dynamicNext from 'next/dynamic';
const ProfileBox = dynamicNext(() => import('@/components/Layout/Header/Profile Box') , { ssr : false })
const ThemeSwitcher = dynamicNext(() => import("@/components/Layout/Header/Theme Switcher"), { ssr : false })
const ResponsiveMenu = dynamicNext(() => import("@/components/Layout/Header/Responsive Menu"), { ssr : false })

const menu = [
    {id: 0, name: 'עמוד הבית', path: '/'},
    {id: 1, name: 'מה מקבלים?', path: '/#מה_מקבלים?'},
    {id: 2, name: 'אודות', path: '/אודות'},
    {id: 3, name: 'צרו קשר', path: '/צרו-קשר'},
    {id: 4, name: 'קורס', path: '/lessons'},
]

const IndexHeader = (props : ImportsTypes) => {
    const {allUsers , allLessons , allContents , settingsData} = props
    const {data : user , status , update} = useSession()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { theme } = useTheme()
    const isDarkMode = theme === 'dark'

    // useEffect(() => {
    //     console.log(error)
    //     if(error) {
    //         switch (error) {
    //             case 'false':
    //                 toast.error('משתמש זה לא קיים!')
    //                 router.push('/')
    //                 break;
    //             default:
    //                 toast.error('שגיאה בהתחברות נסו מאוחר יותר !')
    //                 router.push('/')
    //         }
    //     }
    // }, []);

    // const account = {
    //     authenticated : <TooltipBottom title={user?.user?.fullName || ''}>
    //         <button
    //             onClick={() => signOut({redirect :false})}
    //             className='bg-accentSec dark:bg-accentBg rounded-full text-accentBg dark:text-accentSec transition-all duration-300'>
    //             <AccountIcon fontSize={40}/>
    //         </button>
    //     </TooltipBottom>,
    //     unauthenticated : <button
    //         onClick={() => setUserAction(prev => !prev)}
    //         className='bg-accentSec dark:bg-accentBg rounded-full text-accentBg dark:text-accentSec transition-all duration-300'>
    //         <AccountIcon fontSize={40}/>
    //     </button>,
    //     loading : <div className="h-[20px] w-[20px] md:h-[24px] md:w-[24px]">
    //         <div className="relative w-full h-full rounded-full overflow-hidden">
    //             <div className="progress__circle border-accent border-2">
    //             </div>
    //         </div>
    //     </div>
    // }

    return (
        <header className='flex fixed bg-accentSec dark:bg-accentBg z-50 justify-between shadow items-center w-full h-[100px]'>
            <AuthError searchParams={searchParams.get('error')}/>
            <div className='flex justify-between items-center w-[90%] mx-auto'>
                <div className='items-center flex justify-between gap-x-10'>
                    <Link href='/' className='hidden md:block'>
                        <Image unoptimized={true} src={isDarkMode ? settingsData?.logoDark?.url! : settingsData?.logo?.url!} alt={settingsData?.logoDark?.alt!} width={0} height={0}  className='object-contain w-[100px] md:w-[150px] transition-all duration-300' sizes='100vw' quality={100}/>
                    </Link>
                    <div className='md:hidden'>
                        <ResponsiveMenu menu={menu}/>
                    </div>
                    <div className='mr-10 md:flex hidden items-center gap-x-12'>
                        {
                            menu.map(item => {
                                const isActive = decodeURIComponent(pathname) === item.path
                                return <Link
                                    className={`text-[18px] hover:font-semibold hover:tracking-wider hover:text-accent/60 ${isActive && "font-semibold tracking-wider text-accent"} transition-all duration-300`}
                                    key={item.id} href={item.path}>{item.name}</Link>
                            }

                            )
                        }
                    </div>
                </div>
                <Link href='/' className='md:hidden'>
                    <Image unoptimized={true} src={isDarkMode ? settingsData?.logoDark?.url! : settingsData?.logo?.url!} alt={settingsData?.logoDark?.alt!} width={0} height={0}  className='object-contain w-[100px] md:w-[150px] transition-all duration-300' sizes='100vw' quality={100}/>
                </Link>
                <div className='flex items-center gap-x-4'>
                    <ThemeSwitcher/>
                    <ProfileBox settingsData={settingsData} allUsers={allUsers} allLessons={allLessons} allContents={allContents}/>
                </div>
            </div>
        </header>
    )
}
export default IndexHeader