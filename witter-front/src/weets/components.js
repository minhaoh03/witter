import { useState } from "react"
import { CreateWeet } from "./create"
import { WeetList } from "./list"

export function WeetFeed() {
    const [reload, setReload] = useState(false)
    return <> <CreateWeet create = {setReload} created = {reload} /><WeetList created = {reload}/> </>
}