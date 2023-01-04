import React, { useState } from "react"
import { lookup } from "../backendLookup"

export function EditProfilePopup(props) {
    const emailRef = React.createRef()
    const fnameRef = React.createRef()
    const lnameRef = React.createRef()
    const bioRef = React.createRef()
    const bdayRef = React.createRef()

    const handleClick = () => {
        props.toggle()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let data = JSON.stringify({
            email: emailRef.current.value,
            first_name: fnameRef.current.value,
            last_name: lnameRef.current.value,
            bio: bioRef.current.value,
            birth_date: bdayRef.current.value,
        })
        await lookup(
            process.env.REACT_APP_BACKEND_DOMAIN,
            `users/api/${props.user.id}/`,
            'patch',
            data,
            {
                'Content-Type': 'application/json',
            },
            {},
        )
        window.location.reload();
        props.toggle()
    }



    return (
        <div className='absolute w-[100%] h-full ml-[-30%] bg-white/25 z-20 text-white'>
            <div className='relative ml-[35%] mt-[7%] rounded-xl bg-black w-[30%] h-[65vh] overflow-y-scroll overflow-x-hidden'>
                <div className='sticky flex top-0 rounded-t-xl bg-black/75 h-[6vh] w-full border-b-[1px] border-gray-400/[0.5] pb-2'>
                    <button onClick={handleClick} className="relative ml-[2%] mt-[1vh]">X</button>
                    <span className="relative font-bold text-lg ml-[5%] mt-[1vh]"> Edit profile </span>
                    <form><button onClick={handleSubmit} className='absolute rounded-full px-3 py-1 bg-white text-black font-semibold text-sm ml-[50%] mt-[2%] hover:bg-white/[.95] duration-150'>Save</button></form>
                </div>
                <div className="mx-[5%] w-[90%]">
                    <button className=""><img src={props.picLink} className='shadow m-3 rounded-full border-black border-4 object-cover w-32 h-32'/></button>
                    <div id='email' className='mb-2'>
                        <span className='absolute text-xs mt-1 ml-2 text-gray-500'>Email</span>
                        <input type="email" ref={emailRef} className='outline-none border-[1px] border-gray-400/[0.5] rounded bg-black px-2 pb-2 pt-5 text-sm w-[100%]' defaultValue={props.user.email} required/>
                    </div>  
                    <div id='name' className='flex flex-row my-2 w-full'>
                        <div id='firstname' className='w-[47.5%] mr-[5%]'>
                            <span className='absolute text-xs mt-1 ml-2 text-gray-500'>First Name</span>
                            <input id="firstname" ref={fnameRef} className='outline-none border-[1px] border-gray-400/[0.5] rounded bg-black px-2 pb-2 pt-5 text-sm w-[100%]' defaultValue={props.user.first_name} required/>
                        </div>
                        <div id='lastname' className='w-[47.5%]'>
                            <span className='absolute text-xs mt-1 ml-2 text-gray-500'>Last Name</span>
                            <input id="lastname" ref={lnameRef} className='outline-none border-[1px] border-gray-400/[0.5] rounded bg-black px-2 pb-2 pt-5 text-sm w-[100%]' defaultValue={props.user.last_name} required/>
                        </div>
                    </div>
                    <div>
                        <span className='absolute text-xs mt-1 ml-2 text-gray-500'>Bio</span>
                        <textarea id="bio" ref={bioRef} className='outline-none border-[1px] border-gray-400/[0.5] rounded bg-black px-2 pb-2 pt-5 text-sm w-[100%]' defaultValue={props.user.bio} required></textarea>
                    </div>
                    <div id='bday' className='mt-1 mb-10'>
                        <span className='absolute text-xs mt-1 ml-2 text-gray-500'>Date of Birth</span>
                        <input type="date" id="bday" ref={bdayRef} className='outline-none border-[1px] border-gray-400/[0.5] rounded bg-black px-2 pb-2 pt-5 text-sm w-[100%]' defaultValue={props.user.birth_date} required/>
                    </div>
                </div>
            </div>
        </div>
    )
}