import { useState } from "react"
import { CreateWeet } from "./create"
import { WeetList } from "./list"

export function WeetFeed() {
    const [reload, setReload] = useState(false)
    return (
    <div className="flex flex-col min-w-[35%] max-w-[35%]"> 
        <CreateWeet create = {setReload} created = {reload} />
        <WeetList created = {reload}/>
    </div>
    )
}