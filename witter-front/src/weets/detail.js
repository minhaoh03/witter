import React from 'react'

export function Weet(props) {
    const { content, username, first_name, last_name, profile_picture, time } = props
    const mediaDomain = 'http://localhost:8000/media/'
    const profPic = mediaDomain + profile_picture
    return <div className='rounded border-2 border-gray-900 m-2 w-2/6 flex flex-row bg-green-200' id='weetContainer'>
        <div className='flex flex-column w-1/3 justify-center items-center' id='left'>
            <div id='image' className='justify-self-center'>
                <img className = 'shadow rounded-full align-middle border-none object-cover w-12 h-12' src={profPic} alt="profile pic" />
            </div>
            <div className='text-sm items-bottom' id='time'>
                {time}
            </div>
        </div>
        <div id='right'>
            <div className = 'flex flex-col justify-items-start' id = 'id'>
                <span className = 'text-sm antialiased'>@{username}</span>
                <span className = 'text-sm antialiased font-semibold'>{first_name} {last_name}</span>
            </div>
            <div id='content' className='justify-items-center'>
                {content}
            </div>
            <div id='data'>
            </div>
        </div>
    </div>
}