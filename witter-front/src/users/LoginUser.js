import React, { useEffect, useState } from 'react'

import { useNavigate } from "react-router-dom";
import { lookup } from '../backendLookup';
import { getCSRF } from '../auth';
import { Logo } from '../logo';
import { Link } from 'react-router-dom';

export function LoginUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedin, setLoggedIn] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if(loggedin) {
            return navigate('/home');
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
        <div className='h-screen font-roboto'>
            <div className='ml-[49%] mt-2'>
                <Logo color = '#FFFFFF'/>
            </div>
            <div className='text-gray-400 font-extrabold text-[1.5rem] mt-28 text-center mt-8'> 
                Welcome Back.
            </div>
            <form onSubmit={handleLogin} className="flex flex-col text-white mb-3">
                <div id='username' className='my-6'>
                    <span className='absolute text-xs mt-1 ml-2 text-gray-500'>Username</span>
                    <input type="username" id="username" value={username} onChange={handleUsernameChange} className='outline-none border-[1px] border-gray-400/[0.5] rounded bg-black px-2 pb-2 pt-5 text-sm w-[28rem]' required/>
                </div>
                
                <div id='password' className='mt-1 mb-10'>
                    <span className='absolute text-xs mt-1 ml-2 text-gray-500'>Password</span>
                    <input type="password" id="password" minLength="8" value={password} onChange={handlePasswordChange} className='outline-none border-[1px] border-gray-400/[0.5] rounded bg-black px-2 pb-2 pt-5 text-sm w-[28rem]' required/>
                </div>

                <input className='w-[28rem] border-1 bg-yellow-400 rounded-full py-[0.5rem] text-white font-bold hover:bg-yellow-500 duration-150 hover:cursor-pointer' type="submit" value="Log in"/>
            </form>
            <span className='text-white text-xs text-gray-400'> Don't have an account? <Link className='text-yellow-300 underline underline-offset-2' to='/register' draggable="false"> Create an Account. </Link></span>
        </div>
    )
}

