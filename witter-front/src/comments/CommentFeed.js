import { useEffect, useState } from "react"
import { lookup } from "../backendLookup"
import { Weet } from "../weets/detail"

export function CommentFeed(props) {
    const {weet, reload} = props
    const [isLoading, setIsLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [reloadFeed, setReloadFeed] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            let data = await lookup(
                process.env.REACT_APP_BACKEND_DOMAIN,
                'weets/comments/',
                'post',
                {
                    weet: weet,
                },
                {},
                false
            )
            setComments(data.data.comments)
            setIsLoading(false)
            console.log('hello')
        }
        fetchData()
    }, [isLoading, reload])

    if(comments.length !== 0) {
        return (
            <div className="">
                {comments.map(({ id, text, time_ago, user, likes, reweets, comments }) => (
                        <Weet
                            key={id}
                            id={id}
                            content={text}
                            user_id = {user[0]['id']}
                            first_name={user[0]['first_name']}
                            last_name={user[0]['last_name']}
                            username={user[0]['username']}
                            profile_picture={user[0]['profile_picture']}
                            time={time_ago}
                            likes={likes}
                            reweets={reweets}
                            comments={comments}
                            setReload={setReloadFeed}
                            reload={reloadFeed}
                        />
                ))}
            </div>
        )
    }
    else {
        return <></>
    }
}