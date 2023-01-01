import { IonIcon } from "../icons"
import { useNavigate } from "react-router-dom"

export function JoinUser() {
    const winWidth = window.innerWidth
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        navigate('/register')
    }
    const handleLogin = (e) => {
        e.preventDefault()
        navigate('/login')
    }
    
    return (
        <div className = "flex flex-row h-screen w-screen">
            <div id='left' className="flex flex-col items-end h-screen w-[45vw] min-w-[45vw] bg-black z-20">
                <span className="items-center mr-6 mt-32"><IonIcon icon='logoFill' styles={{fontSize: 50 + 'px', color: '#FCD34D'}}/></span>
                <div className="font-bold text-4xl text-white text-right w-full mr-5 my-5">
                    Find out what's happening
                </div>
                <div className="font-semibold text-xl text-white text-right w-full mr-16 mt-3">
                    Join Witter today.
                </div>
                <div className="flex flex-col h-full items-end w-full">
                    <button onClick={handleRegister} className="font-lato font-semibold border-2 border-yellow-300 rounded-full w-64 h-10 bg-yellow-300 text-black mr-5 my-3 py-1 px-20 hover:bg-black duration-150 hover:text-yellow-300 duration-150">Sign Up</button>

                    <div className="text-xs w-full text-right text-white mr-12 mt-20">
                        Already have an account?
                    </div>
                    <button onClick={handleLogin} className="font-lato font-semibold text-sm border-2 rounded-full w-42 h-8 border-yellow-300 text-yellow-300 mr-5 mt-2 py-1 px-20 hover:bg-yellow-300 duration-150 hover:text-black duration-150">Login</button>
                </div>
            </div>
            <div id='right' className="h-screen w-[55vw] bg-yellow-300 z-10">
                <IonIcon icon='logoFill' styles={{fontSize: 600 + 'px', color: '#FEF3C7', marginLeft: -10 + 'rem', marginTop: 1 + 'rem'}}/>
            </div>
        </div>
        
    )
}