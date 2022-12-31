import axios from 'axios';

export function lookup(domain, route, method, data=null, headers={}, cred=false) {
    return axios({
        baseURL: domain,
        url: route,
        method: method,
        data: data,
        headers: headers,
        withCredentials: cred,
    })
}