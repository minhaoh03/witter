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
            <textarea ref={textAreaRef} required={true} name='weet'>

            </textarea>
            <button style={{ border: 'solid 1px' }} type='submit'> Weet </button>
        </form>
    </div>
}