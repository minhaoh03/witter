import React, {useState, useEffect} from 'react'
import axios from 'axios'

export function CreateUser(props) {
    const emailRef = React.createRef()
    const unRef = React.createRef()
    const fnameRef = React.createRef()
    const lnameRef = React.createRef()
    const passwordRef = React.createRef()
    const bdayRef = React.createRef()
    const privRef = React.createRef()

    const domain = 'http://localhost:8000/'

    const handleSubmit = (event) => {
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
            date_created: null,
            profile_picture: null,
            privacy: priv,
            is_active: true,
            is_staff: false,
            is_superuser: false,
            groups: [],
            user_permissions: []
        })

        try { 
            let result = axios.post(domain + 'users/api/', data, {headers: {
                'Content-Type': 'application/json'
            }})
            console.log(result.response.data)
        }
        catch(error) {
            console.log(error.message);
        }
    }

    return <div>
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
}