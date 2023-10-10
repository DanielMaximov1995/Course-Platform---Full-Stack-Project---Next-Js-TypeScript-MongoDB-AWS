import './globals.css'
import {Assistant} from 'next/font/google'
import {MainLayoutType, PropsTypes} from "@/types/Layout";
import IndexHeader from "@/components/Layout/Header/IndexHeader";
import IndexFooter from "@/components/Layout/IndexFooter";
import {ThemeProviderContext} from "@/components/ThemeContext";
import AuthProvider from "@/components/Auth Provider";
import {getLessons, getSetting, getSiteContent, getUsers} from "@/services/getData";
import ScrollTop from "@/components/Scroll Top";
import WhatsAppFloat from "@/components/WhatsApp Float";
import {SettingSiteType} from "@/types/SchemasType";
import GoogleAnalytics from "@/components/G-Analytics/Google Analytics";

const assistant = Assistant({subsets: ['latin']})

export const generateMetadata = async ({ params, searchParams } : PropsTypes)  => {
    let settings :SettingSiteType = await getSetting()
    return {
        title: {
            template: `${settings.siteName} • %s • ${settings.titleSeo}`,
            default: `${settings.siteName} • ${settings.titleSeo}`,
        },
        description: settings?.descriptionSeo,
        icons : {
            icon : settings?.icon?.url!
        },
        keywords : settings.keywords,
        authors: [{ name: 'Daniel' }, { name: 'Maximov', url: settings.urlSite }],
        url: settings.urlSite,
        openGraph: {
            title: {
                template: `${settings.siteName} • ${settings.titleSeo}`,
                default: settings.siteName,
            },
            description: settings?.descriptionSeo,
            images: [settings.ogImage?.url],
            url: settings.urlSite,
        },
        verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFY,
        },
        images: [
            {
                url: settings.ogImage?.url,
                width: 800,
                height: 600,
                alt: settings.ogImage?.alt,
            },
            {
                url: settings.ogImage?.url,
                width: 1800,
                height: 1600,
                alt: settings.ogImage?.alt,
            },
        ],
    }
}

const RootLayout = async ({children }: MainLayoutType) => {
    const getAllUsers = await getUsers()
    const getAllLessons = await getLessons()
    const getAllContents = await getSiteContent()
    const getSettingsData = await getSetting()

    return (
        <html lang="en" dir='rtl' style={{ scrollBehavior : 'smooth' }}>
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env?.NEXT_PUBLIC_GOOGLE_ANALYTICS!}/>
        <body className={assistant.className} suppressHydrationWarning={true}>
        <AuthProvider>
        <ThemeProviderContext>
            <main className='h-screen relative'>
                <IndexHeader settingsData={getSettingsData} allUsers={getAllUsers} allLessons={getAllLessons} allContents={getAllContents}/>
                <main className='py-10'>
                    {children}
                </main>
                <WhatsAppFloat/>
                <ScrollTop/>
                <IndexFooter/>
            </main>
        </ThemeProviderContext>
        </AuthProvider>
        </body>
        </html>
    )
}

export default RootLayout