import React from "react"
import { lookup } from "../backendLookup"
import { useOutletContext } from "react-router-dom"
import { checkAuth } from "../auth"

export function CommentBar(props) {
    const {user, weet, replyingto, reload, setReload} = props
    const commentRef = React.createRef()
    const picLink = process.env.REACT_APP_MEDIA_DOMAIN + user['profile_picture']

    const handleComment = async (e) => {
        e.preventDefault()
        let auth = await checkAuth()
        await lookup(
            process.env.REACT_APP_BACKEND_DOMAIN,
            'weets/api/weets/',
            'post',
            {
                parent: weet,
                text: commentRef.current.value,
                user: user['id'], 
            },
            {
                'Content-Type': 'application/json',
                'Authorization' : auth[0],
                "X-CSRFToken": auth[1],
            },
            true
        )
        commentRef.current.value = ''
        setReload(!reload)
    }

    return (
        <div className="grid grid-rows-4 grid-cols-8 w-full border-t-[1px] border-b-[1px] border-gray-400/[0.5] text-white font-roboto">
            <div className="mt-4 text-sm row-start-1 row-end-2 col-start-1 col-end-9">
                <span className="ml-16 text-gray-500">Replying to </span><span className="text-yellow-300">@{replyingto}</span>
            </div>
            <div className="row-start-2 row-end-4 col-start-1 col-end-2">
                <img src={picLink} className='shadow ml-2 rounded-full border-none object-cover w-12 h-12'></img>
            </div>
            <div className="flex row-start-2 row-end-4 col-start-2 col-end-9 ">
                <textarea className="text-white outline-0 bg-black resize-none w-full overflow-visible" ref={commentRef} placeholder='Weet your reply'></textarea>
            </div>
            <div className="row-start-4 row-end-5 col-start-1 col-end-9 mb-4">
                <button onClick={handleComment} className="mr-10 rounded-full bg-yellow-300 py-[.5rem] px-4 text-sm font-bold float-right"> Reply </button>
            </div>
        </div>
    )
}