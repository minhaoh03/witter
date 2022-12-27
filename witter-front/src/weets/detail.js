import React from 'react'

export function Weet(props) {
    const { content, username, first_name, last_name, profile_picture, time } = props
    const mediaDomain = 'http://localhost:8000/media/'
    const profPic = mediaDomain + profile_picture
    return (
    <div className='grid grid-rows-4 grid-cols-9 rounded-lg border-2 border-gray-900 m-2 w-136 h-32 overflow-hidden' id='weetContainer'>
        <div className='flex flex-col place-items-center row-start-1 row-end-4 col-start-1 col-end-2' id='left'>
            <div id='image' className='mt-2.5 min-w-12'>
                <img className='shadow rounded-full align-middle border-none object-cover w-12 h-12' src={profPic} alt="profile pic" />
            </div>
            <div id='time' className='mt-2.5 text-sm'>
                {time}
            </div>
        </div>
        <div id='right' className = 'flex flex-col row-start-1 row-end-4 col-span-7'>
            <div id = 'id' className = 'flex flex-col' >
                <span className = 'text-sm antialiased'>@{username}</span>
                <span className = 'text-sm antialiased font-semibold'>{first_name} {last_name}</span>
            </div>
            <div id='content' className='text-sm justify-items-center'>
                {content}
            </div>
        </div>
        <div id='bottom' className = 'flex row-start-4 row-end-5 col-start-1 col-end-10'>
            <div id='comment' className = 'grow text-xs'>
                Comment
            </div>
            <div id='reweet' className = 'grow text-xs'>
                Reweet
            </div>
            <div id='digs' className = 'grow text-xs'>
                Likes    
            </div>
        </div>
    </div>
    )
}