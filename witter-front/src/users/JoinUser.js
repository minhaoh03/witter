import { IonIcon } from "../icons"
import { useNavigate } from "react-router-dom"

export function JoinUser() {
    const navigate = useNavigate()

    const handleRegister = () => {
        navigate('/register')
    }
    const handleLogin = () => {
        navigate('/login')
    }
    
    return (
        <div className = "flex flex-row h-screen w-screen">
            <div className="flex flex-col h-screen w-[55vw] bg-white z-20">
                <span><IonIcon icon='logoFill' styles={{fontSize: 50 + 'px', color: '#FCD34D'}}/></span>
                <div className="flex flex-col h-full place-items-center">
                    <button onSubmit={handleRegister} className="font-lato font-semibold border-2 border-yellow-300 rounded-full bg-yellow-300 m-2 py-2 px-10">Sign Up</button>
                    <button onSubmit={handleLogin} className="font-lato font-semibold border-2 rounded-full border-yellow-300 m-2 py-2 px-10">Login</button>
                </div>
            </div>
            <div className="h-screen w-[calc(100vw_-_55vw)] bg-yellow-300 z-10">
                <IonIcon icon='logoFill' styles={{fontSize: 500 + 'px', color: '#FEF3C7'}}/>
            </div>
        </div>
        
    )
}