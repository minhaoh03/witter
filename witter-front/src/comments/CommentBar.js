import React from "react"
import { lookup } from "../backendLookup"
import { useOutletContext } from "react-router-dom"

export function CommentBar(props) {
    const {user, weet} = props
    const commentRef = React.createRef()
    const picLink = process.env.REACT_APP_MEDIA_DOMAIN + user['profile_picture']

    const handleComment = async (e) => {
        e.preventDefault()
        console.log(commentRef.current.value)
        console.log(weet)
        await lookup(
            process.env.REACT_APP_BACKEND_DOMAIN,
            'weets/api/comments/',
            'post',
            {
                root_weet: weet,
                text: commentRef.current.value,
                user: user['id'],
            },
            {},
            false
        )
    }

    return (
        <div className="grid grid-rows-4 grid-cols-8 w-full border-[1px] border-gray-400/[0.5] text-white">
            <div className="row-start-1 row-end-2 col-start-1 col-end-9 border-[1px] border-gray-400/[0.5]">
                Replying to...
            </div>
            <div className="row-start-2 row-end-4 col-start-1 col-end-2 border-[1px] border-gray-400/[0.5]">
                <img src={picLink}></img>
            </div>
            <div className="row-start-2 row-end-4 col-start-2 col-end-9 border-[1px] border-gray-400/[0.5]">
                <textarea className="text-black" ref={commentRef} placeholder='Weet your reply'></textarea>
            </div>
            <div className="row-start-4 row-end-5 col-start-1 col-end-9 border-[1px] border-gray-400/[0.5]">
                <form onSubmit={handleComment}><button className=""> Reply </button></form>
            </div>
        </div>
    )
}