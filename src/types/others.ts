import {ChangeEvent, ReactNode} from "react";

export type IconsType = {
    color ?: "primary" | "accent" | "success" | "error" | "warning" | "info";
    fontSize ?: number;
    position ?: "right" | "left" | "up" | "bottom"
}

export type CustomEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement> & {
    target: {
        name: string;
        value: string;
        id: string;
    };
};

