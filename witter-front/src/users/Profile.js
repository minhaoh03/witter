import { checkAuth } from "../auth"
import { useOutletContext } from "react-router-dom"

export function Profile() {
    const auth = checkAuth()

    const [user, setUser] = useOutletContext()

    const picLink = process.env.REACT_APP_BACKEND_DOMAIN + user['profile_picture']

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    return (
        <div className="inline-block min-w-[550px] max-w-[40vw] text-white">
            <div className="sticky top-0 bg-black/75 h-[7%] border-b-[1px] border-gray-400/[0.5] pb-2">
                <div className="flex flex-col">
                    <span className="font-bold text-lg ml-[10%]">{user.first_name} {user.last_name}</span>
                    <span className="text-xs mt-[-.25rem] ml-[10%] text-gray-500">Weets</span>
                </div>
            </div>
            <div className="flex flex-col w-full h-screen">
                <div className="h-[27%] bg-gradient-to-r from-orange-500 to-yellow-300 border-b-[1px] border-gray-400/[0.5]">
                    
                </div>
                <img src={picLink} className='absolute mt-[9%] shadow m-4 rounded-full border-black border-4 object-cover w-32 h-32'></img>
                <div className="h-[10%] ml-[80%]">
                    <button onSubmit={handleSubmit} className='py-1 px-3 mt-3 text-sm font-bold shadow bg-transparent border-[1px] border-white/50 rounded-full hover:bg-white/[0.1] duration-150'>Edit profile</button>
                </div>
                
                <div className="flex flex-col h-[25%] border-b-[1px] border-gray-400/[0.5]">
                    <span className="font-extrabold text-lg ml-3 mt-2">{user.first_name} {user.last_name}</span>
                    <span className="text-sm mt-[-.25rem] ml-3 text-gray-500">@{user.username}</span>
                    <span className="mt-2 ml-3 text-sm">{user.bio}</span>
                    
                </div>
            </div>
        </div>
    )
}