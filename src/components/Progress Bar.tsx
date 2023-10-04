'use client'

const ProgressBar = ({ value }: { value: number }) => {

    return (
            <div className='bg-accentBg my-1 border-accentSec border-[2px] relative h-4 w-full'>
                <div style={{ width : `${value.toFixed()}%` }} className={`bg-accent absolute top-0 right-0 flex h-full items-center justify-center text-xs font-semibold text-white`}>
                    {value.toFixed()}%
                </div>
            </div>
    );
}

export default ProgressBar