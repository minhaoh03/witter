import axios from 'axios';

export function lookup(domain: string, route: string, method: string, data: any | {}, headers: {[key: string]: string}, cred: boolean) {
    return axios({
        baseURL: domain,
        url: route,
        method: method,
        data: data,
        headers: headers,
        withCredentials: cred,
    })
}