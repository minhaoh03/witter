import axios from 'axios'
import {Weet} from './detail'
import React, {useState, useEffect} from 'react'

export function WeetComponent(props) {
    const [weets, setWeets] = useState([])
    const [error, setError] = useState(null)
    const domain = 'http://localhost:8000/'
    useEffect(() => {
        axios(domain + 'weets/api/weets/')
            .then((response) => {
                setWeets(response.data)
                setError(null)
            })
        .catch(setError)
    }, [])
    if (error) return <p>An error occurred</p>
    return (
        <div className="WeetComponent">
          {weets.map(({ text, privacy, user }) => (
            <Weet
              text = {text}
              privacy = {privacy}
              user = {user}
            />
          ))}
        </div>
      );
}


