'use client'
import {IconsType} from "@/types/others";

const strokes = {
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-green-600',
    error: 'text-red-600',
    warning: 'text-yellow-400',
    info : 'stroke-white'
}

const LockIcon = ({ fontSize, color } : IconsType) => {

    return (
        <svg
            className={`${color && strokes[color]}`}
            style={{ fontSize : `${fontSize}px`}}
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            stroke="none"
            fill="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            <g id="svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtaGlkZGVuPSJ0cnVlIiBmb2N1c2FibGU9ImZhbHNlIiByb2xlPSJwcmVzZW50YXRpb24iIGNsYXN" data-name="svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtaGlkZGVuPSJ0cnVlIiBmb2N1c2FibGU9ImZhbHNlIiByb2xlPSJwcmVzZW50YXRpb24iIGNsYXN" transform="translate(0.5 0.5)">
                <path id="svg_2" data-name="svg 2" d="M20.48,16.556v-1.4A5.254,5.254,0,0,1,25.987,10a5.322,5.322,0,0,1,5.507,5.151v1.4" transform="translate(-16.331 -10)" fill="none" stroke="currentColor" strokeWidth="1"/>
                <path id="svg_4" data-name="svg 4" d="M11.62,24H30.938V37.942H11.62Z" transform="translate(-11.62 -17.444)" fill="none" stroke="currentColor" strokeWidth="1"/>
                <path id="Path_35" data-name="Path 35" d="M32.24,37v3.278" transform="translate(-22.583 -24.356)" fill="none" stroke="currentColor" strokeWidth="1"/>
                <ellipse id="Ellipse_2" data-name="Ellipse 2" cx="0.702" cy="0.702" rx="0.702" ry="0.702" transform="translate(8.954 11.239)" fill="none" stroke="currentColor" strokeWidth="1"/>
            </g>
        </svg>
    );
};

export default LockIcon