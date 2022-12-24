import axios from 'axios'
import React, { useState, useEffect, } from 'react'

import { Weet } from './detail'

export function WeetList(props) {
  const [weets, setWeets] = useState([])
  const [error, setError] = useState(null)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const domain = 'http://localhost:8000/' //change
    axios.get(domain + 'weets/api/weets/')
      .then((res) => {
        console.log(res.data)
        setWeets(res.data)
        setError(null)
      })
      .catch((err) => {
        console.log(err)
      })
    console.log(props.created)
  }, [reload, props.created])

  const handleReload = (event) => {
    event.preventDefault()
    setReload(!reload)
}

  if (error) return <p>An error occurred</p>

  return (
    <div className="WeetContainer">
      <form onSubmit = {handleReload}>
        <button type = 'submit' onSubmit = {handleReload}>Reload</button>
      </form>
      {weets.map(({ text, privacy, user }, index) => (
        <Weet
          key={index}
          text={text}
          privacy={privacy}
          user={user}
        />
      ))}
    </div>
  );
}


