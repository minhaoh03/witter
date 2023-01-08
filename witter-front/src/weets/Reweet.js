import React, {useEffect, useState} from 'react'
import { lookup } from '../backendLookup'
import { useNavigate } from 'react-router-dom'

export function Reweet(props) {
    const { child } = props
    const [isLoading, setIsLoading] = useState(true)
    const [profPic, setProfPic] = useState('')
    const [weet, setWeet] = useState({})
    const navigate = useNavigate()
 
    useEffect(() => {
        const fetchData = async () => {
          // get the data from the api
          const data = await lookup(
            process.env.REACT_APP_BACKEND_DOMAIN,
            `weets/api/weets/${child}`,
            'get',
            undefined,
            undefined,
            undefined,
          )
          setWeet(data.data)
          setIsLoading(false)
          const link = process.env.REACT_APP_MEDIA_DOMAIN + data.data.user[0]['profile_picture']
          setProfPic(link)
        }
        fetchData()
        
    }, [isLoading, profPic])

    function handleWeet(e) {
        e.preventDefault()
        e.stopPropagation()
        window.location.href = `/${child}`
    }

    if(!isLoading) {
        return (
            <div onClick={handleWeet} className='grid grid-rows-4 grid-cols-9 rounded-lg border-[1px] border-gray-400/[0.5] m-2 min-w-[95%] max-w-[95%] max-h-fit overflow-hidden cursor-pointer hover:bg-white/[.03] duration-200' id='weetContainer'>
                <div className='flex flex-col place-items-center row-start-1 row-end-4 col-start-1 col-end-2 mt-1 ml-2' id='left'>
                    <div id='image' className='mt-2.5 min-w-12'>
                        <img className='shadow rounded-full align-middle border-none object-cover w-10 h-10' src={profPic} alt="profile pic" />
                    </div>
                    <div id='time' className='text-gray-500 mt-2.5 text-sm text-white'>
                        {weet['time_ago']}
                    </div>
                </div>
                <div id='right' className = 'flex flex-col row-start-1 row-end-4 col-span-7 mt-2 ml-2'>
                    <div id = 'id' className = 'flex flex-col text-sm antialiased' >
                        <span className='text-gray-500'>@{weet.user[0]['username']}</span>
                        <span className = 'font-semibold text-white'>{weet.user[0]['first_name']} {weet.user[0]['last_name']}</span>
                    </div>
                    <div className='text-white'>
                    </div>
                    <div id='content' className='text-sm break-words h-fit overflow-visible justify-items-center text-white'>
                        {weet['text']}
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
    
}