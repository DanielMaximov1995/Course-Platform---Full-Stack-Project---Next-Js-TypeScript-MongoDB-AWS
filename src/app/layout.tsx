import './globals.css'
import type {Metadata} from 'next'
import {Assistant} from 'next/font/google'
import {MainLayoutType} from "@/types/Layout";
import IndexHeader from "@/components/Layout/Header/IndexHeader";
import IndexFooter from "@/components/Layout/IndexFooter";
import {ThemeProviderContext} from "@/components/ThemeContext";
import AuthProvider from "@/components/Auth Provider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const assistant = Assistant({subsets: ['latin']})
export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

const RootLayout = ({children }: MainLayoutType) => {

    return (
        <html lang="en" dir='rtl'>
        <body className={assistant.className} suppressHydrationWarning={true}>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            rtl={true}
        />
        <AuthProvider>
        <ThemeProviderContext>
            <IndexHeader/>
                {children}
            <IndexFooter/>
        </ThemeProviderContext>
        </AuthProvider>
        </body>
        </html>
    )
}

export default RootLayout