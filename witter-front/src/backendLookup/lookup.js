import axios from 'axios';

export function lookup(domain, route, method, data=null, headers=null) {
    return axios({
        baseURL: domain,
        url: route,
        method: method,
        data: data,
        headers: headers,
    })
}