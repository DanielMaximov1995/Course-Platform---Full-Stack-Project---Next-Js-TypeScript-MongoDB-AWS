'use client'
import {useState} from 'react'
import {CloseIcon, SettingIcon} from "@/components/Icons";
import Modal from "@/components/Modal";
import {ImportsTypes} from "@/types/Layout";
import SettingsForm from "@/components/Layout/Setting Area/Settings Form";

const MainSetting = ({settingsData} : ImportsTypes) => {
    const [openSettingState, setOpenSettingState] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpenSettingState(prev => !prev)}
                className='hover:tracking-wider gap-x-2 items-center w-full dark:text-accentBg text-accentSec rounded transition-all p-1.5 duration-300 flex justify-center text-[20px]'>
                <SettingIcon fontSize={30}/>
                <span>הגדרות</span>
            </button>
            <Modal isOpen={openSettingState} onClose={() => setOpenSettingState(prev => !prev)}>
                <div className='w-full md:w-[800px] h-screen overflow-auto relative z-50 p-6 bg-accentSec dark:bg-accentBg rounded'>
                    <button onClick={() => setOpenSettingState(prev => !prev)}><CloseIcon fontSize={30} color='error'/></button>
                    <div className='w-full h-full mx-auto'>
                        <p className='h3 text-center'>הגדרות האתר</p>
                        <SettingsForm settingsData={settingsData}/>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default MainSetting
