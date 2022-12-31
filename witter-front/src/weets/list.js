import React, { useState, useEffect, } from 'react'

import { Weet } from './detail'
import { lookup } from '../backendLookup'

export function WeetList(props) {
  const domain = process.env.REACT_APP_BACKEND_DOMAIN //change
  const [weets, setWeets] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      // get the data from the api
      const data = await lookup(
        domain,
        'weets/api/weets/',
        'get',
        undefined,
        undefined,
        undefined,
      )
      setWeets(data.data)
    }
    fetchData()
  }, [reload, props.created, domain])

  const handleReload = (event) => {
    event.preventDefault()
    setReload(!reload)
  }
  
  return (
    <div className="bg-black font-fira flex flex-col justify-items-center items-center flex-wrap h-full">
      <form onSubmit={handleReload}>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" type='submit' onSubmit={handleReload}>Reload</button>
      </form>
      {weets.map(({ text, time_ago, user, likes, reweets, comments }, index) => (
        <Weet
          key={index}
          content={text}
          first_name={user[0]['first_name']}
          last_name={user[0]['last_name']}
          username={user[0]['username']}
          profile_picture={user[0]['profile_picture']}
          time={time_ago}
          likes={likes}
          reweets={reweets}
          comments={comments}
        />
      ))}
    </div>
  );
}


