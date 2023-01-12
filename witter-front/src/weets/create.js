
import React from 'react'
import { checkAuth } from '../auth';
import { lookup } from '../backendLookup';

export function CreateWeet(props) {
    const {user} = props
    const textAreaRef = React.createRef()
    const domain = process.env.REACT_APP_BACKEND_DOMAIN

    const picLink = process.env.REACT_APP_MEDIA_DOMAIN + user['profile_picture']

    // Creating new weet submission
    const handleSubmit = async (event) => {
        event.preventDefault()
        var textAreaVal = textAreaRef.current.value
        
        const finishCreate = () => {
            props.create(!props.created)
            textAreaRef.current.value = ''
        }
        
        let auth = await checkAuth()

        await lookup(
            domain, 
            'weets/api/weets/', 
            'post', 
            {
                text: textAreaVal, 
                image: null, 
                privacy: 'public', //change privacy
                parent: null
            }, 
            {
                'Content-Type': 'application/json',
                'Authorization' : auth[0],
                "X-CSRFToken": auth[1],
            }, 
        )
        finishCreate()
    }

    // Return
    return (
        <div className='font-roboto bg-black'>
            <form onSubmit={handleSubmit} className = 'flex flex-col border-b-[1px] border-gray-400/[0.5] mb-2 min-h-[100px]'>
                <div className='flex'>
                    <span className='ml-2'><img src={picLink} className='shadow m-1 rounded-full border-none object-cover w-12 h-12' alt='profile pic'></img></span>
                    <textarea className='
                            block ml-2 p-2.5 w-[90%] overflow-auto outline-none resize-none placeholder-gray-500 text-lg bg-black text-gray-300'
                        ref={textAreaRef} required={true} name='weet' placeholder='What&#8217;s happening?'>
                    </textarea>
                </div>
                
                <button className="bg-yellow-300 text-white text-sm font-bold rounded-full h-[32px] w-[64px] self-end mb-2 mr-5 hover:bg-yellow-400 duration-50" type='submit'> Weet </button>
            </form>
        </div>
    )
}