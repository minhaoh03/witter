import { IonIcon } from "../icons"
import { useNavigate } from "react-router-dom"

export function UserAuth(props) {
    const {user} = props
    console.log(user)
    const navigate = useNavigate()
    
    const picLink = process.env.REACT_APP_BACKEND_DOMAIN + user['profile_picture']

    function handleClick() {
        return navigate('/logout')
    }
    return (
        <button onClick={handleClick} className="absolute flex bottom-5 rounded-full pr-2 py-2 w-[48%] hover:bg-white/[.1] duration-300">
            <img className="shadow ml-2 rounded-full border-none object-cover w-10 h-10" src={picLink} alt='profile pic'></img>
            <div className="flex flex-col ml-2">
                <span className="text-sm text-gray-100 font-bold"> {user['first_name']} {user['last_name']}</span>
                <span className="text-xs text-gray-500 mr-auto"> @{user['username']} </span>
            </div>
            <span className="self-center ml-auto mt-2"><IonIcon size='small' icon='moreFill'/></span>
        </button>
    )    
}
