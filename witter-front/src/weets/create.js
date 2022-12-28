import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export function CreateWeet(props) {
    const [csrf, setCSRF] = useState('')

    const textAreaRef = React.createRef()
    const domain = 'http://localhost:8000/'
    const navigate = useNavigate()

    // Token Auth Variable
    let tokenAuth = localStorage.getItem('token')

    // CSRF getter
    useEffect(() => {
        axios.get("http://localhost:8000/users/auth/csrf/", {
             withCredentials: true,
        })
            .then((res) => {
                let csrfToken = res.headers.get("X-CSRFToken");
                setCSRF(csrfToken)
            })
    }, []);

    // Non logged in user
    useEffect(() => {
        if (tokenAuth === 'null') {
            return navigate('/login')
        }
    })

    // Creating new weet submission
    const handleSubmit = async (event) => {
        event.preventDefault()
        var textAreaVal = textAreaRef.current.value
        try {
            await axios.post(domain + 'weets/api/weets/', {
                text: textAreaVal,
                image: null,
                privacy: 'public', //change
                parent: null
            }, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization' : tokenAuth,
                "X-CSRFToken": csrf,
            }})
        } finally {
            props.create(created => !created)
        }
        textAreaRef.current.value = ''
    }
    
    // Return
    if (tokenAuth !== 'null') {
        return <div className='font-fira bg-black p-3'>
            <form onSubmit={handleSubmit} className = 'flex place-content-center border-2 rounded-lg'>
                <textarea className='
                        block p-2.5 w-full resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-fira'
                    ref={textAreaRef} required={true} name='weet'>
                </textarea>
                <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded font-fira" type='submit'> Weet </button>
            </form>
        </div>
    }
}