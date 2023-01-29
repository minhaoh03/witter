import { lookup } from "../backendLookup";

export async function getCSRF() {
    let data = await lookup(
        process.env.REACT_APP_BACKEND_DOMAIN,
        'users/auth/csrf/',
        'get',
        {},
        {},
        true
    )

    return data.headers.get('X-CSRFToken')
}