import { ReactElement } from 'react'

export type ToastTypes = {
    id ? : any;
    action ?: string | "";
    message : string;
    promise ?: void | null
}

export type ToastContainerPromiseType = {
    index : number;
    position : string;
    onHideToast : () => void;
    action ?: string | "";
    message ?: string;
    toast ?: any
}

export type ActionMap = {
    [key: string]: ReactElement
    success: ReactElement;
    warning: ReactElement;
    error: ReactElement;
    progress: ReactElement;
};