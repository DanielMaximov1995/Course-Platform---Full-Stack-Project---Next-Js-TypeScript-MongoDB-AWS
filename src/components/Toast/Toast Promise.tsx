import React, { useEffect, useState , CSSProperties } from 'react';
import ErrorIcon from "@/components/Icons/Error Icon";
import CheckIcon from "@/components/Icons/Check Icon";
import CloseIcon from "@/components/Icons/Close Icon";
import {ActionMap, ToastContainerPromiseType} from "@/types/Toast";

const ToastContainerPromise = (props : ToastContainerPromiseType) => {
    const { position, onHideToast , index, toast } = props;
    const [toastData, setToastData] = useState({ action : '' , message : '' });

    useEffect(() => {
        setToastData(prev => ({...prev , action: toast.action , message: toast.message[toast.action]}))
    },[toast])

    const promiseToast = async () => {
        try {
            const promiseFunc = toast.promise.promise;
            const resolvedData = await promiseFunc();
            const successMessage = toast.message.success(resolvedData);
            setToastData((prev) => ({ ...prev, action: 'success', message: successMessage }));
        } catch (err) {
            const errorMessage = toast.message.error(err);
            setToastData((prev) => ({ ...prev, action: 'error', message: errorMessage }));
        }
    };

    useEffect(() => {
        if (toastData.action === 'progress') {
            promiseToast();
        }
    }, [toastData.action]);


    const actionMap : ActionMap = {
        success: <div className={`bg-green-600 w-[30%] h-full ${position.includes('left') ? 'rounded-bl rounded-tl' : 'rounded-br rounded-tr'} flex items-center justify-center`}><CheckIcon fontSize={40} color='info'  /></div>,
        warning: <div className={`bg-orange-300 w-[30%] h-full ${position.includes('left') ? 'rounded-bl rounded-tl' : 'rounded-br rounded-tr'}  flex items-center justify-center`}><ErrorIcon fontSize={40} color='info'  /></div>,
        error: <div className={`bg-red-500 w-[30%] h-full ${position.includes('left') ? 'rounded-bl rounded-tl' : 'rounded-br rounded-tr'}  flex items-center justify-center`}><CloseIcon fontSize={40} color='info' /></div>,
        progress: <div className={`bg-accent w-[30%] h-full ${position.includes('left') ? 'rounded-bl rounded-tl' : 'rounded-br rounded-tr'}  flex items-center justify-center`}>
            <div className="h-[20px] w-[20px] md:h-[24px] md:w-[24px]">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                    <div className="progress__circle border-white border-2">
                    </div>
                </div>
            </div>
        </div>
    };

    const [isShowing, setIsShowing] = useState(true);


    useEffect(() => {
        if(toastData.action !== 'progress') {
            const timer = setTimeout(() => {
                setIsShowing(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [toastData]);


    useEffect(() => {
        if (!isShowing) {
            setTimeout(() => {
                onHideToast();
            }, 5000); // Delay removal to allow for fade-out animation
        }
    }, [isShowing]);

    const getPositionStyles = (position : string, index : number) => {
        switch (position) {
            case 'top-center':
                return {
                    top: `${4 + index * 70}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                };
            case 'top-left':
                return {
                    top: `${4 + index * 70}px`,
                    left: '4px',
                };
            case 'top-right':
                return {
                    top: `${4 + index * 70}px`,
                    right: '4px',
                };
            case 'bottom-center':
                return {
                    bottom: `${4 + index * 70}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                };
            case 'bottom-left':
                return {
                    bottom: `${4 + index * 70}px`,
                    left: '4px',
                };
            case 'bottom-right':
                return {
                    bottom: `${4 + index * 70}px`,
                    right: '4px',
                };
            default:
                return {};
        }
    };


    const style: CSSProperties = {
        ...getPositionStyles(position, index),
    };

// Add the direction property conditionally
    if (position.includes('left')) {
        style.direction = 'ltr';
    } else {
        style.direction = 'rtl';
    }

    return (
        <div
            style={style}
            onClick={() => onHideToast()}
            className={`fixed flex items-center cursor-pointer z-high bg-white rounded shadow-lg w-[350px] h-[60px] transition-all duration-300 ease-in-out ${isShowing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'}`}
        >
            {actionMap[toastData.action]}
            <div className='w-full p-2 text-accentBg'>{toastData.message}</div>
        </div>
    );
};

export default ToastContainerPromise;