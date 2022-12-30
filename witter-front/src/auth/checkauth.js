import axios from 'axios';

export async function checkAuth() {
    let csrf = ''

    // Token Auth Variable
    let tokenAuth = localStorage.getItem('token')

    // CSRF getter
    await axios.get("http://localhost:8000/users/auth/csrf/", {
            withCredentials: true,
    }).then((res) => {
            console.log(res)
            let csrfToken = res.headers.get("X-CSRFToken");
            csrf = csrfToken
        })


    // Non logged in user
    if (tokenAuth === 'null') {
        window.location.href = 'https://localhost:8000/login'
    }

    var ret = new Array();

    if (tokenAuth !== 'null' && csrf !== '') {
        ret[0] = tokenAuth
        ret[1] = csrf
        return ret
    } 
    ret[0] = 'null'
    ret[1] = ''
    return ret
}