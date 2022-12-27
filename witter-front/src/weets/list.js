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
  }, [reload, props.created])

  const handleReload = (event) => {
    event.preventDefault()
    setReload(!reload)
}

  if (error) return <p>An error occurred</p>

  return (
    <div className="bg-gray-300 font-fira flex flex-col justify-items-center items-center flex-wrap h-full">
      <form onSubmit = {handleReload}>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" type = 'submit' onSubmit = {handleReload}>Reload</button>
      </form>
      {weets.map(({ text, time_ago, user }, index) => (
        <Weet
          key = {index}
          content = {text}
          first_name = {user[0]['first_name']}
          last_name = {user[0]['last_name']}
          username = {user[0]['username']}
          profile_picture = {user[0]['profile_picture']}
          time = {time_ago}
        />
      ))}
    </div>
  );
}


