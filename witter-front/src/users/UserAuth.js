export function UserAuth(props) {
    const {user} = props
    
    let profPicLink = process.env.REACT_APP_BACKEND_DOMAIN + user.profile_picture
    
    return (
        <div className="rounded-full bg-gray-800 mt-16 py-4 w-[95%]">
            <img src={profPicLink}></img>
        </div>
    )
}