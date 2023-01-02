import { checkAuth } from "../auth"

export function Profile() {
    const auth = checkAuth()

    return (
        <div className="inline-block min-w-[550px] max-w-[40vw] text-white ">
            <div className="">
                
            </div>
        </div>
    )
}