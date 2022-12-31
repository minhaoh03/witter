import React from 'react'
import { lookup } from '../backendLookup'

export function CreateUser(props) {
    const emailRef = React.createRef()
    const unRef = React.createRef()
    const fnameRef = React.createRef()
    const lnameRef = React.createRef()
    const passwordRef = React.createRef()
    const bdayRef = React.createRef()
    const privRef = React.createRef()

    const domain = process.env.REACT_APP_BACKEND_DOMAIN // Change

    const handleSubmit = async (event) => {
        event.preventDefault()
        var email = emailRef.current.value
        var un = unRef.current.value
        var fname = fnameRef.current.value
        var lname = lnameRef.current.value
        var password = passwordRef.current.value
        var bday = bdayRef.current.value
        var priv = privRef.current.value
        
        let data = JSON.stringify({
            password: password,
            email: email,
            username: un,
            first_name: fname,
            last_name: lname,
            bio: null,
            birth_date: bday,
            privacy: priv,
            // groups: [],
            // user_permissions: []
        })

        await lookup(
            domain,
            'users/api/',
            'post',
            data,
            {
                'Content-Type': 'application/json'
            }
        )
    }

    return (
        <div className='text-gray-400'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email"> Email: </label>
                <input type="email" id="email" ref={emailRef} required/>

                <label htmlFor="username"> Username: </label>
                <input type="username" id="username" ref={unRef} required/>

                <label htmlFor="firstname"> First Name: </label>
                <input id="firstname" ref={fnameRef} required/>

                <label htmlFor="lastname"> Last Name: </label>
                <input id="lastname" ref={lnameRef} required/>

                <label htmlFor="password"> Password: </label>
                <input type="password" id="password" minLength="8" ref={passwordRef} required/>

                <label htmlFor="birthdate"> Birthday: </label>
                <input type="date" id="bday" ref={bdayRef} required/>

                <label htmlFor="privacy"> Privacy: </label>
                <select name="privacy" id="privacy" ref={privRef}> 
                    <option value="private"> Private </option>
                    <option value="public"> Public </option>
                    <option value="followers"> Followers </option>
                </select>

                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}
