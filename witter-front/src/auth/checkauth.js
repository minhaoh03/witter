import { lookup } from '../backendLookup';

export async function checkAuth() {
    let csrf = ''

    // Token Auth Variable
    let tokenAuth = localStorage.getItem('token')

    // Non logged in user
    if (tokenAuth === 'null') {
        window.location.href = 'https://localhost:8000/login'
    }

    // CSRF getter
    const data = await lookup(
        process.env.REACT_APP_BACKEND_DOMAIN,
        'users/auth/csrf/',
        'get',
        undefined,
        {},
        true,
    )

    csrf = data.headers.get("X-CSRFToken")

    var ret = []

    if (tokenAuth !== 'null' && csrf !== '') {
        ret[0] = tokenAuth
        ret[1] = csrf
        return ret
    } 
    ret[0] = 'null'
    ret[1] = ''
    return ret
}