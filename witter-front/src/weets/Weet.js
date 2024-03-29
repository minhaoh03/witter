import React, { useState, useEffect, createRef } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { IonIcon } from '../icons/IonIcons'
import { lookup } from '../backendLookup'
import { checkAuth, getUser } from '../auth'
import { CommentBar } from '../comments'
import { Reweet } from './Reweet'
import { CommentFeed } from '../comments/CommentFeed'

export function Weet(props) {
    const { id, content, username, user_id, image, first_name, last_name, profile_picture, time, parent, reload, setReload, reweetPopup} = props
    const domain = process.env.REACT_APP_BACKEND_DOMAIN
    const profPic = process.env.REACT_APP_MEDIA_DOMAIN + profile_picture
    let navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false)
    const [liked, setLiked] = useState(false)
    const [reweeted, setReweeted] = useState(false)
    const [likeCount, setLikeCount] = useState(props.likes)
    const [reweetCount, setReweetCount] = useState(props.reweets)
    const [commentCount, setCommentCount] = useState(props.comments)
    const [child, setChild] = useState(props.child)

    useEffect(() => {
        const getLiked = async () => {
            const user = await getUser()
            const auth = await checkAuth()
            const alrLiked = await lookup(
                                process.env.REACT_APP_BACKEND_DOMAIN,
                                'weets/digs/digged/',
                                'post',
                                {
                                    user: user['id'],
                                    weet: id,
                                },
                                {
                                    "X-CSRFToken": auth[1],
                                },
                                true,
                            )
            if(alrLiked.data['liked']) {
                setLiked(true)
            } else {
                setLiked(false)
            }
        }

        const getReweet = async () => {
            const user = await getUser()
            const auth = await checkAuth()
            const alrReweeted = await lookup(
                process.env.REACT_APP_BACKEND_DOMAIN,
                'weets/weets/reweeted/',
                'post',
                {
                    user: user['id'],
                    child: id,
                },
                {
                    "X-CSRFToken": auth[1],
                },
                true,
            )
            if(alrReweeted.data['reweeted']) {
                setReweeted(true)
            } else {
                setReweeted(false)
            }
        }
        getLiked()
        getReweet()
        setIsLoading(false)
    }, [isLoading, liked, reweeted])

    function handleWeet(e) {
        e.preventDefault()
        return navigate(`/${username}/${id}`)
    }

    async function handleComment(e) {       //make popup
        e.stopPropagation()
        const user = await getUser()
        const auth = await checkAuth()
    }

    async function handleReweet(e) {
        e.stopPropagation()
        const user = await getUser()
        const auth = await checkAuth()
        try {
            await lookup(
                domain, 
                'weets/api/weets/', 
                'post', 
                {
                    text: '', 
                    image: null, 
                    privacy: 'public', //change privacy
                    child: id
                }, 
                {
                    'Content-Type': 'application/json',
                    'Authorization' : auth[0],
                    "X-CSRFToken": auth[1],
                }, 
                true
            )
            setReweetCount(reweetCount+1)
        }
        catch(e) {              // Decrement if pressed again
            const alrReweeted = await lookup(
                process.env.REACT_APP_BACKEND_DOMAIN,
                'weets/weets/reweeted/',
                'delete',
                {
                    user: user['id'],
                    child: id,
                },
                {
                    "X-CSRFToken": auth[1],
                },
                true,
            )
            setReweetCount(reweetCount-1)
        }
        setReweeted(!reweeted)
        setReload(!reload)
    }

    function toggleReweetPopup() {
        reweetPopup()
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
            setLikeCount(likeCount-1)
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
            setLikeCount(likeCount+1)
        }
        setLiked(!liked)
    }

    if(!isLoading) {
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
                
                <div id='right' className = 'flex flex-col row-start-1 row-end-4 col-start-2 col-end-8 mt-2 ml-2'>
                    <div id = 'id' className = 'flex flex-col text-sm antialiased' >  
                        
                        <span className='text-gray-500'>@{username}</span>
                        <span className = 'font-semibold text-white'>{first_name} {last_name}</span>
                    </div>
                    <div id='content' className='text-sm break-words h-fit overflow-visible justify-items-center text-white'>
                        
                        {child && <Reweet child={child}/>}
                        {image && <img src={image}/>}
                        <span className=''>{content}</span>
                    </div>
                </div>
                <div className='flex row-start-1 row-end-4 col-start-8 col-end-10'>
                    {parent && <span className='mt-2 ml-4 text-gray-400 text-xs'>@{username} commented</span>}
                </div>
                
                <div id='bottom' className = 'flex row-start-4 row-end-5 col-start-1 col-end-10 text-gray-500'>
                    <div className = 'flex grow text-[13px] justify-center items-end mb-3'>
                        <div onClick={handleComment} className='flex p-1 h-[50%]'>
                            <span className=''><IonIcon icon='comment' size='small'/></span>
                            <span className='ml-2 mb-1'>{commentCount}</span>  
                        </div>
                    </div>
                    <div className = 'flex grow text-[13px] justify-center items-end mb-3'>
                        <div onClick={handleReweet} className='flex p-1 h-[50%]'>
                            {reweeted && <span className='text-purple-300'><IonIcon icon='reweet' size='small'/></span>}
                            {reweeted && <span className='ml-2 mb-1 text-purple-300'>{reweetCount}</span>}
                            {!reweeted && <span className=''><IonIcon icon='reweet' size='small'/></span>}
                            {!reweeted && <span className='ml-2 mb-1'>{reweetCount}</span>}
                        </div>
                    </div>
                    <div className = 'flex grow text-[13px] justify-center items-end mb-3'>
                        <div onClick={handleDig} className='flex p-1 h-[50%]'>
                            {liked && <span className='animate-bounce text-yellow-300'><IonIcon icon='digFill' size='small'/></span>}
                            {liked && <span className='ml-2 mb-1 text-yellow-300'>{likeCount}</span>}
                            {!liked && <span className=''><IonIcon icon='dig' size='small'/></span>}
                            {!liked && <span className='ml-2 mb-1'>{likeCount}</span>}
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
    return <div className='text-white'>Loading...</div>
}


















export function WeetPage() {
    const [weet, setWeet] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const [user, setUser] = useOutletContext()
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
      }, [isLoading, reload])


    if(!isLoading) {
        return (
            <div className="inline-flex flex-col align-top min-w-[35%] max-w-[35%] h-full">
                <Weet
                    id={weet['id']}
                    content={weet['text']}
                    child={weet['child']}
                    user_id={weet.user[0]['id']}
                    first_name={weet.user[0]['first_name']}
                    last_name={weet.user[0]['last_name']}
                    username={weet.user[0]['username']}
                    profile_picture={weet.user[0]['profile_picture']}
                    time={weet['time_ago']}
                    image={weet['image']}
                    likes={weet['likes']}
                    reweets={weet['reweets']}
                    comments={weet['comments']}
                    reload={reload}
                    setReload={setReload}
                />
                <CommentBar user = {user} replyingto = {weet.user[0]['username']} weet={weet['id']} reload={reload} setReload={setReload}/>
                <CommentFeed weet={weet['id']} reload={reload}/>
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