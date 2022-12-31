import React, { useEffect, useState } from 'react'

import { useNavigate } from "react-router-dom";
import { lookup } from '../backendLookup';
import { getCSRF } from '../auth';

export function LoginUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedin, setLoggedIn] = useState(false);
    const navigate = useNavigate()

    // useEffect(() => {
    //     axios.get("http://localhost:8000/users/auth/csrf/", {
    //          withCredentials: true,
    //     })
    //         .then((res) => {
    //             let csrfToken = res.headers.get("X-CSRFToken");
    //             setCSRF(csrfToken)
    //         })
    // }, []);

    useEffect(() => {
        if(loggedin) {
            return navigate('/');
        }
    }, [loggedin, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();
        
        let data = JSON.stringify({
            username: username,
            password: password
        })
        
        let csrf = await getCSRF()

        data = await lookup(
            process.env.REACT_APP_BACKEND_DOMAIN,
            'users/auth/login/',
            'post',
            data,
            {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrf,
            },
            true
        )

        setUsername('')
        setPassword('')
        localStorage.setItem('token', data.data.Authentication)
        setLoggedIn(true)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }


    return (
        <div className='h-full'>
            <form onSubmit={handleLogin} className="text-gray-400">
                <label htmlFor="username"> Username: </label>
                <input type="username" id="username" value={username} onChange={handleUsernameChange} />
                <label htmlFor="password"> Password: </label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

