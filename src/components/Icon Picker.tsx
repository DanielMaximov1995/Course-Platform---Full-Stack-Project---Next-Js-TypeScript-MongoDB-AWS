'use client'
import * as Icons from '@/components/Icons'
import {FC, SVGProps} from "react";
import {IconsType} from "@/types/others";

type IconPickerProps = {
    onSelect: (iconName: string) => void;
    selected ?: string;
};

export type IconComponent = {
    [key: string]: FC<SVGProps<SVGSVGElement> & IconsType>;
};

const iconComponents: IconComponent = Icons;


const IconPicker = ({ onSelect , selected } : IconPickerProps) => {
    const iconNames = Object.keys(iconComponents).filter(icon => icon !== 'ChevronIcon')

    return (
        <div className="flex flex-wrap gap-2">
            {iconNames.map((iconName, index) => {
                const selectedIcon = selected === iconName
                const IconComponent = iconComponents[iconName];
                return (
                    <div key={index} className={`hover:bg-accent ${selectedIcon && "bg-accent/40"} cursor-pointer effect`} onClick={() => onSelect(iconName)}>
                        <IconComponent fontSize={30}/>
                    </div>
                );
            })}
        </div>
    );
};

export default IconPicker;
