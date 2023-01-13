
import React from 'react'
import { checkAuth } from '../auth';
import { lookup } from '../backendLookup';
import { IonIcon } from '../icons';

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

        let data = new FormData()
        if(document.getElementById('image').files[0])
            data.append('image', document.getElementById('image').files[0], 'image.png')
        data.append('text', textAreaVal)
        data.append('privacy', 'public')

        await lookup(
            domain, 
            'weets/api/weets/', 
            'post', 
            data,
            {
                'Authorization' : auth[0],
                "X-CSRFToken": auth[1],
            }, 
        )
        finishCreate()
    }

    const chooseImage = (event) => {
        event.preventDefault()
        document.getElementById("image").click();
    }


    return (
        <div className='font-roboto bg-black'>
            <div className = 'flex flex-col border-b-[1px] border-gray-400/[0.5] mb-2 min-h-[100px]'>
                <div className='flex'>
                    <span className='ml-2'><img src={picLink} className='shadow m-1 rounded-full border-none object-cover w-12 h-12' alt='profile pic'></img></span>
                    <textarea className='
                            block ml-2 p-2.5 w-[90%] overflow-auto outline-none resize-none placeholder-gray-500 text-lg bg-black text-gray-300'
                        ref={textAreaRef} required={true} name='weet' placeholder='What&#8217;s happening?'>
                    </textarea>
                </div>
                <div className='w-full h-full py-3'>
                    <div className='flex ml-20 justify-start h-full'>
                        <input id='image' accept="image/jpeg,image/png" type='file' className='h-0 overflow-hidden'/>
                        <span className='text-gray-300' onClick={chooseImage}><IonIcon icon='image'/></span>
                    </div>
                    <button onClick={handleSubmit} className="bg-yellow-300 text-white text-sm font-bold rounded-full h-[32px] w-[64px] float-right mr-5 self-center justify-self-center hover:bg-yellow-400 duration-50" type='submit'> Weet </button>
                </div>
                
            </div>
        </div>
    )
}