import React, {SyntheticEvent} from 'react'
import { checkAuth } from '../../features/auth';
import { lookup } from '../../utils/backendLookup';
import { IonIcon } from '../icons';

interface CreateWeetProps {
    user: any
    create: (arg0: boolean) => void
    created: boolean
}

export function CreateWeet(props: CreateWeetProps) {
    const {user, create, created} = props

    const textAreaRef = React.useRef<HTMLTextAreaElement>(null)

    const domain : string | undefined = process.env.REACT_APP_BACKEND_DOMAIN

    const picLink : string = process.env.REACT_APP_MEDIA_DOMAIN + user['profile_picture']
    const imageInput = document.getElementById('image') as HTMLInputElement

    // Creating new weet submission
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        var textAreaVal = textAreaRef.current!.value
        
        const finishCreate = () => {
            create(!created)
            textAreaRef.current!.value = ''
        }
        
        let auth = await checkAuth()

        let data = new FormData()

        const createFormData = (): void => {
            if(imageInput.files![0])
                data.append('image', imageInput.files![0], 'image.png')
            data.append('text', textAreaVal)
            data.append('privacy', 'public')
        }
        createFormData()
        

        await lookup(
            domain!, 
            'weets/api/weets/', 
            'post', 
            data,
            {
                'Authorization' : auth[0]!,
                "X-CSRFToken": auth[1]!,
            }, 
            false
        )
        finishCreate()
    }

    const chooseImage = (e: SyntheticEvent) => {
        e.preventDefault()
        imageInput.click();
    }


    return (
        <div className='font-roboto bg-black'>
            <div className = 'flex flex-col border-b-[1px] border-gray-400/[0.5] mb-2 min-h-[100px]'>
                <div className='flex'>
                    <span className='ml-2'><img src={picLink} className='shadow m-1 rounded-full border-none object-cover w-12 h-12' alt='profile pic'></img></span>
                    <textarea className='
                            block ml-2 p-2.5 w-[90%] overflow-auto outline-none resize-none placeholder-gray-500 text-lg bg-black text-gray-300' ref={textAreaRef} required={true} name='weet' placeholder='What&#8217;s happening?'>
                    </textarea>
                </div>
                <div className='grid grid-cols-8 grid-rows-1 w-full h-full py-3'>
                    <div className='col-span-7 grid grid-cols-8 w-full h-full'>
                        <input id='image' accept="image/jpeg,image/png" type='file' className='h-0 overflow-hidden'/>
                        <span className='text-gray-300 cursor-pointer ml-3' onClick={chooseImage}><IonIcon icon='image'/></span>
                    </div>
                    <button onClick={handleSubmit} className="col-start-8 bg-yellow-300 text-white text-sm font-bold rounded-full h-[32px] w-[64px] float-right mr-5 hover:bg-yellow-400 duration-50" type='submit'> Weet </button>
                </div>
                
            </div>
        </div>
    )
}