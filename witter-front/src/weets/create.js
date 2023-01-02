import React from 'react'
import { checkAuth } from '../auth';
import { lookup } from '../backendLookup';

export function CreateWeet(props) {
    const textAreaRef = React.createRef()
    const domain = process.env.REACT_APP_BACKEND_DOMAIN

    // Creating new weet submission
    const handleSubmit = async (event) => {
        event.preventDefault()
        var textAreaVal = textAreaRef.current.value
        
        const finishCreate = () => {
            props.create(created => !created)
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
                <textarea className='
                        block ml-16 p-2.5 overflow-auto outline-none resize-none placeholder-gray-500 text-lg bg-black text-gray-300'
                    ref={textAreaRef} required={true} name='weet' placeholder='What&#8217;s happening?'>
                </textarea>
                <button className="bg-yellow-300 text-white text-sm font-bold rounded-full h-[32px] w-[64px] self-end mb-2 mr-5 hover:bg-yellow-400 duration-50" type='submit'> Weet </button>
            </form>
        </div>
    )
}