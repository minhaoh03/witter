import { useState } from "react"
import { CreateWeet } from "./create"
import { WeetList } from "./list"
import { useOutletContext } from "react-router-dom";

export function WeetFeed() {
    const [user, setUser] = useOutletContext();
    const [reload, setReload] = useState(false)

    return (
    <div className="inline-flex flex-col align-top min-w-[550px] max-w-[40vw]"> 
        <span className="font-bold text-white text-lg font-roboto pl-3 pb-2 mt-2 w-[100%]">Home</span>
        <CreateWeet user = {user} create = {setReload} created = {reload} />
        <WeetList created = {reload}/>
    </div>
    )
}