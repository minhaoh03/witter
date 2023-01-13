import React, { useState, useEffect, } from 'react'

import { Weet } from './detail'
import { lookup } from '../backendLookup'

export function WeetList(props) {
  const domain = process.env.REACT_APP_BACKEND_DOMAIN //change
  const [weets, setWeets] = useState([])
  const [reload, setReload] = useState(false)
  const [reloadWeets, setReloadWeets] = useState(false)

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
      const list = data.data
      setWeets(list)
    }
    fetchData()
  }, [reload, props.created])

  const handleReload = (event) => {
    event.preventDefault()
    setReload(!reload)
  }
  
  return (
    <div className="bg-black font-fira flex flex-col justify-items-center items-center flex-wrap h-full">
      <form className='w-full'onSubmit={handleReload}>
        <button className="text-yellow-300 text-sm border-b-[1px] w-full border-gray-400/50 pb-2 hover:bg-white/[.03]" type='submit' onSubmit={handleReload}>Show New Weets</button>
      </form>
      {weets.map(({ id, text, time_ago, user, image, likes, reweets, comments, parent, child }) => (
        <Weet
          key={id}
          id={id}
          content={text}
          child={child}
          user_id = {user[0]['id']}
          first_name={user[0]['first_name']}
          last_name={user[0]['last_name']}
          username={user[0]['username']}
          profile_picture={user[0]['profile_picture']}
          time={time_ago}
          image={image}
          parent={parent}
          likes={likes}
          reweets={reweets}
          comments={comments}
          reload={reload}
          setReload={setReload}
          reloadWeets={reloadWeets}
        />
      ))}
    </div>
  );
}


