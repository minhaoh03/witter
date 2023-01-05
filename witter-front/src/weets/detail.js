import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IonIcon } from '../icons/IonIcons'
import { lookup } from '../backendLookup'
import { checkAuth, getUser } from '../auth'

export function Weet(props) {
    const { id, content, username, user_id, first_name, last_name, profile_picture, time, } = props
    const domain = process.env.REACT_APP_BACKEND_DOMAIN
    const profPic = domain + profile_picture
    let navigate = useNavigate();
    
    const [likes, setLikes] = useState(props.likes)
    const [reweets, setReweets] = useState(props.reweets)
    const [comments, setComments] = useState(props.reweets)

    function handleWeet(e) {
        e.preventDefault()
        
        return navigate(`/${id}`)
    }

    function handleComment() {

    }

    function handleReweet() {

    }
    
    async function handleDig(e) {
        e.stopPropagation()
        const user = await getUser()
        const auth = await checkAuth()
        const alrLiked = await lookup(
            process.env.REACT_APP_BACKEND_DOMAIN,
            'weets/digs/digged/',
            'delete',
            {
                user: user['id'],
                weet: id,
            },
            {
                "X-CSRFToken": auth[1],
            },
            true,
        )
        if(alrLiked.data['deleted']) {
            setLikes(likes-1)
        }
        else {
            await lookup(
                process.env.REACT_APP_BACKEND_DOMAIN,
                `weets/api/digs/`,
                'post',
                {
                    user: user['id'],
                    weet: id,
                },
                undefined,
                undefined,
            )
            setLikes(likes+1)
        }
    }

    return (
    <div onClick={handleWeet} className='grid grid-rows-4 grid-cols-9 rounded-lg border-[1px] border-gray-400/[0.5] m-2 min-w-[95%] max-w-[95%] max-h-fit overflow-hidden cursor-pointer hover:bg-white/[.03] duration-200' id='weetContainer'>
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
            <div id='content' className='text-sm break-words h-fit overflow-visible justify-items-center text-white'>
                {content}
            </div>
        </div>
        <div id='bottom' className = 'flex row-start-4 row-end-5 col-start-1 col-end-10 text-gray-500'>
            <button id='comment' onClick={handleComment} className = 'flex grow text-[13px] items-center justify-center'>
                <span className=''><IonIcon icon='comment' size='small'/></span>
                <span className='ml-2 mb-1'>{comments}</span>  
            </button>
            <div id='reweet' onClick={handleReweet} className = 'flex grow text-[13px] items-center justify-center '>
                <span className=''><IonIcon icon='reweet' size='small'/></span>
                <span className='ml-2 mb-1'>{reweets}</span>  
            </div>
            <div id='digs' onClick={handleDig} className = 'flex grow text-[13px] items-center justify-center'>
                <span className=''><IonIcon icon='dig' size='small'/></span>
                <span className='ml-2 mb-1'>{likes}</span>    
            </div>
        </div>
    </div>
    )
}

export function WeetPage(props) {
    const [weet, setWeet] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    useEffect(() => {
        const fetchData = async () => {
          // get the data from the api
          const data = await lookup(
            process.env.REACT_APP_BACKEND_DOMAIN,
            `weets/api/weets/${id}`,
            'get',
            undefined,
            undefined,
            undefined,
          )
          setWeet(data.data)
          setIsLoading(false)
        }
        fetchData()
      }, [isLoading, id])


    if(!isLoading) {
        return (
            <div className="inline-flex flex-col align-top min-w-[35%] max-w-[35%]">
                <Weet
                    id={weet['id']}
                    content={weet['text']}
                    user_id={weet.user[0]['id']}
                    first_name={weet.user[0]['first_name']}
                    last_name={weet.user[0]['last_name']}
                    username={weet.user[0]['username']}
                    profile_picture={weet.user[0]['profile_picture']}
                    time={weet['time_ago']}
                    likes={weet['likes']}
                    reweets={weet['reweets']}
                    comments={weet['comments']}
                />
            </div>
        )
    }
    else {
        return (
            <div className='inline-block text-white'>

            </div>
        )
    }
}