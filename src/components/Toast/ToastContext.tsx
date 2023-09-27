import React, {createContext, useState, useContext, Fragment} from 'react';
import { ReactNodeType } from "@/types/Layout";
import ToastContainer from "@/components/Toast/Toast Container";
import ToastContainerPromise from "@/components/Toast/Toast Promise";
import {ToastTypes} from "@/types/Toast";

const ToastContext = createContext({
    error: (message: string) => {},
    warning: (message: string) => {},
    success: (message: string) => {},
    promise: (func: any, messages: any) => {},
});

export const ToastProvider = ({ children }: ReactNodeType) => {
    const [toastQueue, setToastQueue] = useState<ToastTypes[]>([]);

    const toast = (action: string, message: string, promise?: any) => {
        const id = Date.now();
        let newToast : ToastTypes;
        if (!promise) {
            newToast = { id, action, message, promise: null };
        } else {
            newToast = { id, action , message, promise };
        }
        setToastQueue((prevQueue) => [...prevQueue, newToast]);
    };

    const promise = (func: any, messages: string) => {
        toast('progress', messages, { promise: func });
    };

    const success = (message: string) => {
        toast('success', message);
    };

    const error = (message: string) => {
        toast('error', message);
    };

    const warning = (message: string) => {
        toast('warning', message);
    };

    const onHideToast = (id: number) => {
        setToastQueue((prevQueue) => prevQueue.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ error, warning, success, promise }}>
            {children}
            {toastQueue?.map((toast, index) => {
                return toast.promise === null ? (
                    <Fragment key={toast.id}>
                        <ToastContainer
                            index={toastQueue.length - index}
                            position={'top-center'}
                            action={toast.action}
                            message={toast.message}
                            onHideToast={() => onHideToast(toast.id)}
                        />
                    </Fragment>
                ) : (
                    <Fragment key={toast.id}>
                    <ToastContainerPromise
                        key={toast.id}
                        index={toastQueue.length - index}
                        position={'top-center'}
                        toast={toast}
                        onHideToast={() => onHideToast(toast.id)}
                    />
                    </Fragment>
                );
            })}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
