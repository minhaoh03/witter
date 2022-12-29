import React from 'react'

export function Weet(props) {
    const { content, username, first_name, last_name, profile_picture, time } = props
    const mediaDomain = 'http://localhost:8000/media/'
    const profPic = mediaDomain + profile_picture
    return (
    <div className='grid grid-rows-4 grid-cols-9 rounded-lg border-[1px] border-gray-400/[0.5] m-2 w-136 h-36 overflow-hidden' id='weetContainer'>
        <div className='flex flex-col place-items-center row-start-1 row-end-4 col-start-1 col-end-2 mt-1 ml-2' id='left'>
            <div id='image' className='mt-2.5 min-w-12'>
                <img className='shadow rounded-full align-middle border-none object-cover w-12 h-12' src={profPic} alt="profile pic" />
            </div>
            <div id='time' className='mt-2.5 text-sm text-white'>
                {time}
            </div>
        </div>
        <div id='right' className = 'flex flex-col row-start-1 row-end-4 col-span-7 mt-2 ml-2'>
            <div id = 'id' className = 'flex flex-col text-white text-sm antialiased' >
                <span>@{username}</span>
                <span className = 'font-semibold'>{first_name} {last_name}</span>
            </div>
            <div id='content' className='text-sm break-words overflow-hidden justify-items-center text-white'>
                {content}
            </div>
        </div>
        <div id='bottom' className = 'flex row-start-4 row-end-5 col-start-1 col-end-10 text-white'>
            <div id='comment' className = 'ml-2 grow text-xs'>
                Comment
            </div>
            <div id='reweet' className = 'ml-2 grow text-xs'>
                Reweet
            </div>
            <div id='digs' className = 'ml-2 grow text-xs'>
                Likes    
            </div>
        </div>
    </div>
    )
}