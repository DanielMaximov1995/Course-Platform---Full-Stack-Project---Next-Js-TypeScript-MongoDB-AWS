'use client'
import {ReactNodeType} from "@/types/Layout";
import {ThemeProvider} from "next-themes";
import {useEffect, useState} from "react";
import {ToastProvider} from "@/components/Toast/ToastContext";

export const ThemeProviderContext = ({ children } : ReactNodeType) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return <>
        <ThemeProvider defaultTheme="dark" attribute="class">
            <ToastProvider>
            {children}
            </ToastProvider>
        </ThemeProvider>
    </>
};