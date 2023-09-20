import React, {CSSProperties, useEffect, useState} from 'react';
import CheckIcon from "@/components/Icons/Check Icon";
import CloseIcon from "@/components/Icons/Close Icon";
import ErrorIcon from "@/components/Icons/Error Icon";
import {ActionMap, ToastContainerPromiseType} from "@/types/Toast";

const ToastContainer = (props : ToastContainerPromiseType) => {
    const { position, action = "progress", message, onHideToast , index } = props;


    const actionMap : ActionMap = {
        success: <div className={`bg-green-600 w-[30%] h-full ${position.includes('left') ? 'rounded-bl rounded-tl' : 'rounded-br rounded-tr'} flex items-center justify-center`}><CheckIcon fontSize={40} color='info' /></div>,
        warning: <div className={`bg-orange-300 w-[30%] h-full ${position.includes('left') ? 'rounded-bl rounded-tl' : 'rounded-br rounded-tr'}  flex items-center justify-center`}><ErrorIcon fontSize={40} color='info' /></div>,
        error: <div className={`bg-red-500 w-[30%] h-full ${position.includes('left') ? 'rounded-bl rounded-tl' : 'rounded-br rounded-tr'}  flex items-center justify-center`}><CloseIcon fontSize={40} color='info' /></div>,
        progress: <div className="h-[20px] w-[20px] md:h-[24px] md:w-[24px]">
            <div className="relative w-full h-full rounded-full overflow-hidden">
                <div className="progress__circle border-accent border-2">
                </div>
            </div>
        </div>
    };

    const [isShowing, setIsShowing] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsShowing(false);
        }, 3000); // Hide the toast after 3 seconds
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isShowing) {
            // Remove the toast from the queue when it's hidden
            setTimeout(() => {
                onHideToast();
            }, 300); // Delay removal to allow for fade-out animation
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
            className={`fixed flex items-center z-high bg-white rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-[270px] h-[60px] transition-all duration-300 ease-in-out ${isShowing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'}`}
        >
            {actionMap[action]}
            <div className='w-full p-2 text-primary'>{message}</div>
        </div>
    );
};

export default ToastContainer;