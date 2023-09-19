'use client'
import {ReactNodeType} from "@/types/Layout";
import {ThemeProvider} from "next-themes";
import {useEffect, useState} from "react";
export const ThemeProviderContext = ({ children } : ReactNodeType) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return <ThemeProvider defaultTheme="dark" attribute="class">{children}</ThemeProvider>
};