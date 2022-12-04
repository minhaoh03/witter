import axios from 'axios'
import React, {useState, useEffect} from 'react'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export function CreateWeet(props) {
    const user = props.user
    const textAreaRef = React.createRef()
    const domain = 'http://localhost:8000/'
    

    const handleSubmit = (event) => {
        event.preventDefault()
        var textAreaVal = textAreaRef.current.value
        axios.post(domain + 'weets/api/weets/', {
            text: textAreaVal,
            image: null,
            privacy: 'public',
            parent: null
        })
        textAreaRef.current.value = ''
    }
    
    return <div className = 'createWeet'>
        <form onSubmit={handleSubmit}>
            <textarea className='
                        block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                        ref={textAreaRef} required={true} name='weet'>
            </textarea>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" type='submit'> Weet </button>
        </form>
    </div>
}