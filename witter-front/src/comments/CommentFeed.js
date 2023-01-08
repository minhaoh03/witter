import { useEffect, useState } from "react"
import { lookup } from "../backendLookup"

export function CommentFeed(props) {
    const {weet} = props
    const [isLoading, setIsLoading] = useState(true)
    const [comments, setComments] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            let data = await lookup(
                process.env.REACT_APP_BACKEND_DOMAIN,
                'weets/comments/weetComments/',
                'post',
                {
                    root_weet: weet,
                },
                {},
                false
            )
            setComments(data.data)
            setIsLoading(false)
        }
        fetchData()
    })
    return (
        <div className="">
            {comments.map(({ user, image, text }, index) => (
                    <Weet
                        key={index}
                        content={text}
                        user_id = {user[0]['id']}
                        first_name={user[0]['first_name']}
                        last_name={user[0]['last_name']}
                        username={user[0]['username']}
                        profile_picture={user[0]['profile_picture']}
                        image = {image}
                        time={time_ago}
                        likes={likes}
                        reweets={reweets}
                        comments={comments}
                    />
            ))}
        </div>
    )
}