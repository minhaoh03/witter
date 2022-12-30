import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../auth';
import { lookup } from '../backendLookup';

export function CreateWeet(props) {
    // const [csrf, setCSRF] = useState('')

    const textAreaRef = React.createRef()
    const domain = process.env.REACT_BACKEND_DOMAIN
    const auth = useRef(checkAuth())

    // const navigate = useNavigate()

    // // Token Auth Variable
    // let tokenAuth = localStorage.getItem('token')

    // // CSRF getter
    // useEffect(() => {
    //     axios.get("http://localhost:8000/users/auth/csrf/", {
    //          withCredentials: true,
    //     })
    //         .then((res) => {
    //             let csrfToken = res.headers.get("X-CSRFToken");
    //             setCSRF(csrfToken)
    //         })
    // }, []);

    // // Non logged in user
    // useEffect(() => {
    //     if (tokenAuth === 'null') {
    //         return navigate('/login')
    //     }
    // })
    // Creating new weet submission
    const handleSubmit = (event) => {
        event.preventDefault()
        var textAreaVal = textAreaRef.current.value
        
        const finishCreate = () => {
            props.create(created => !created)
            textAreaRef.current.value = ''
        }

        lookup(
            domain = domain, 
            'weets/api/weets/', 
            'post', 
            {
                text: textAreaVal, 
                image: null, 
                privacy: 'public', //change privacy
                parent: null
            }, 
            {
                'Content-Type': 'application/json',
                'Authorization' : auth[0],
                "X-CSRFToken": auth[1],
            }, 
            finishCreate()
        )
    }

    // Return
    return <div className='font-fira bg-black p-3'>
        <form onSubmit={handleSubmit} className = 'flex place-content-center border-[1px] border-gray-400/[0.5] rounded-lg'>
            <textarea className='
                    block p-2.5 w-full resize-none text-sm text-gray-900 bg-gray-50 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-fira'
                ref={textAreaRef} required={true} name='weet'>
            </textarea>
            <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded font-fira" type='submit'> Weet </button>
        </form>
    </div>
}