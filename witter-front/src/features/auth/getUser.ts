import { lookup } from "../backendLookup"
import { checkAuth } from "./checkAuth.ts"

export async function getUser() {
    let auth = await checkAuth()
    // get the data from the api
    let u = await lookup(
        process.env.REACT_APP_BACKEND_DOMAIN,
        'users/auth/getuser/',
        'get',
        {},
        {
            'Content-Type': 'application/json',
            'Authorization': auth[0],
            "X-CSRFToken": auth[1],
        },
        true,
    )
    return u.data
}