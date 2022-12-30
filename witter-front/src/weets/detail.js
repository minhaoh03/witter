import React, { useState } from 'react'
import { IonIcon } from '../icons/IonIcons'
import axios from 'axios'
import { checkAuth } from '../auth'

export function Weet(props) {
    const { content, username, first_name, last_name, profile_picture, time, reweets, comments } = props
    const domain = process.env.REACT_BACKEND_DOMAIN
    const mediaDomain = domain + 'media/'
    const profPic = mediaDomain + profile_picture

    const auth = checkAuth()

    const [likes, setLikes] = useState(props.likes)

    function handleClick(e) {
        e.preventDefault()
    }

    async function handleLike(e) {
        e.preventDefault()
        await axios.post(domain + 'weets/api/digs/', {
            
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : auth[0],
                "X-CSRFToken": auth[1],
            }
        })
    }

    return (
    <div className='grid grid-rows-4 grid-cols-9 rounded-lg border-[1px] border-gray-400/[0.5] m-2 w-[95%] h-36 overflow-hidden hover:bg-white/[.01] duration-200' id='weetContainer'>
        <div className='flex flex-col place-items-center row-start-1 row-end-4 col-start-1 col-end-2 mt-1 ml-2' id='left'>
            <div id='image' className='mt-2.5 min-w-12'>
                <img className='shadow rounded-full align-middle border-none object-cover w-12 h-12' src={profPic} alt="profile pic" />
            </div>
            <div id='time' className='text-gray-500 mt-2.5 text-sm text-white'>
                {time}
            </div>
        </div>
        <div id='right' className = 'flex flex-col row-start-1 row-end-4 col-span-7 mt-2 ml-2'>
            <div id = 'id' className = 'flex flex-col text-sm antialiased' >
                <span className='text-gray-500'>@{username}</span>
                <span className = 'font-semibold text-white'>{first_name} {last_name}</span>
            </div>
            <div id='content' className='text-sm break-words overflow-hidden justify-items-center text-white'>
                {content}
            </div>
        </div>
        <div id='bottom' className = 'flex row-start-4 row-end-5 col-start-1 col-end-10 text-gray-500'>
            <div id='comment' className = 'flex grow text-[13px] items-center justify-center'>
                <span className=''><IonIcon icon='comment' size='small'/></span>
                <span className='ml-2 mb-1'>{comments}</span>  
            </div>
            <div id='reweet' className = 'flex grow text-[13px] items-center justify-center'>
                <span className=''><IonIcon icon='reweet' size='small'/></span>
                <span className='ml-2 mb-1'>{reweets}</span>  
            </div>
            <div id='digs' className = 'flex grow text-[13px] items-center justify-center'>
                <span className=''><IonIcon icon='dig' size='small'/></span>
                <span className='ml-2 mb-1'>{likes}</span>    
            </div>
        </div>
    </div>
    )
}