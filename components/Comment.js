import React from 'react'
import Link from 'next/link'

const Comment = ({ name, time, comment, username }) => {
    return (
        <div className='flex flex-row items-start my-7 gap-4'>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-11 h-11 text-zinc-400">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>

            </div>
            <div className='flex flex-col'>
                <div className='flex flex-row items-center gap-2'>
                    <Link href={`/${username}`}><p className='text-gray-300 text-base font-semibold'>{name}</p></Link>
                    <p className='text-gray-500 text-xs'>{time}</p>
                </div>
                <p className='text-gray-400'>{comment}</p>
            </div>
        </div>
    )
}

export default Comment