import {ChangeEvent, ReactNode} from "react";

export type IconsType = {
    color ?: "primary" | "accent" | "success" | "error" | "warning" | "info";
    fontSize ?: number;
    position ?: "right" | "left" | "up" | "bottom"
}

// export interface CustomInputElement extends HTMLInputElement {
//     'data-id' ?: any;
// }