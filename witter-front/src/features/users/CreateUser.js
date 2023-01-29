import React, {useState} from 'react'
import { lookup } from '../../backendLookup'
import { Logo } from '../../logo'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthErrorPopup } from '../../popups'
import { getCSRF } from '../../auth'


export function CreateUser() {
    const emailRef = React.createRef()
    const unRef = React.createRef()
    const fnameRef = React.createRef()
    const lnameRef = React.createRef()
    const passwordRef = React.createRef()
    const bdayRef = React.createRef()

    const [authError, setAuthError] = useState('')

    const navigate = useNavigate()

    const domain = process.env.REACT_APP_BACKEND_DOMAIN // Change

    const handleSubmit = async (event) => {
        event.preventDefault()
        var email = emailRef.current.value
        var un = unRef.current.value
        var fname = fnameRef.current.value
        var lname = lnameRef.current.value
        var password = passwordRef.current.value
        var bday = bdayRef.current.value
        
        let data = JSON.stringify({
            password: password,
            email: email,
            username: un,
            first_name: fname,
            last_name: lname,
            bio: null,
            birth_date: bday,
        })
        try {
            await lookup(
                domain,
                'users/api/',
                'post',
                data,
                {
                    'Content-Type': 'application/json'
                }
            )
        } catch (error) {
            if(error.response.data.email)
                setAuthError(error.response.data.email)
            else if(error.response.data.username)
                setAuthError(error.response.data.username)
            console.clear()
            setTimeout(() => {
                setAuthError('')
            }, 5000);
            console.log(error)
            return 
        }

        let csrf = await getCSRF()

        data = JSON.stringify({
            password: password,
            username: un,
        })

        console.log(data)
        
        data = await lookup(
            process.env.REACT_APP_BACKEND_DOMAIN,
            'users/auth/login/',
            'post',
            data,
            {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrf,
            },
            true
        )

        localStorage.setItem('token', data.data.Authentication)

        navigate('/home')
    }

    return (
        <div className='h-screen font-roboto'>
            <div className='ml-[49%] pt-2'>
                <Logo color = '#FFFFFF'/>
            </div>

            <div className='text-gray-400 font-extrabold text-[1.5rem] ml-[-15rem] text-center mt-8'> 
                Create Your Account 
            </div>
            
            <form onSubmit={handleSubmit} className='flex flex-col text-white items-center w-screen mt-4'>
                <div id='email' className='my-2'>
                    <span className='absolute text-xs mt-1 ml-2 text-gray-500'>Email</span>
                    <input type="email" ref={emailRef} className='outline-none border-[1px] border-gray-400/[0.5] rounded bg-black px-2 pb-2 pt-5 text-sm w-[28rem]' required/>
                </div>
                <div id='username' className='my-2'>
                    <span className='absolute text-xs mt-1 ml-2 text-gray-500'>Username</span>
                    <input type="username" id="username" ref={unRef} className='outline-none border-[1px] border-gray-400/[0.5] rounded bg-black px-2 pb-2 pt-5 text-sm w-[28rem]' required/>
                </div>
                <div id='name' className='flex flex-row my-2'>
                    <div id='firstname' className='mx-1'>
                        <span className='absolute text-xs mt-1 ml-2 text-gray-500'>First Name</span>
                        <input id="firstname" ref={fnameRef} className='outline-none border-[1px] border-gray-400/[0.5] rounded bg-black px-2 pb-2 pt-5 text-sm w-[13.8rem]' required/>
                    </div>
                    <div id='lastname' className='mx-1'>
                        <span className='absolute text-xs mt-1 ml-2 text-gray-500'>Last Name</span>
                        <input id="lastname" ref={lnameRef} className='outline-none border-[1px] border-gray-400/[0.5] rounded bg-black px-2 pb-2 pt-5 text-sm w-[13.8rem]' required/>
                    </div>
                </div>
                
                <div id='password' className='my-2'>
                    <span className='absolute text-xs mt-1 ml-2 text-gray-500'>Password (8 char min.)</span>
                    <input type="password" id="password" minLength="8" ref={passwordRef} className='outline-none border-[1px] border-gray-400/[0.5] rounded bg-black px-2 pb-2 pt-5 text-sm w-[28rem]' required/>
                </div>
                <div id='bday' className='mt-1 mb-10'>
                    <span className='absolute text-xs mt-1 ml-2 text-gray-500'>Date of Birth</span>
                    <input type="date" id="bday" ref={bdayRef} className='outline-none border-[1px] border-gray-400/[0.5] rounded bg-black px-2 pb-2 pt-5 text-sm w-[28rem]' required/>
                </div>

                <input className='w-[28rem] border-1 bg-yellow-400 rounded-full mb-2 py-[0.5rem] text-white font-bold hover:bg-yellow-500 duration-150 hover:cursor-pointer' type="submit" value="Sign up"/>
            </form>

            <span className='absolute text-gray-400 right-[52%] text-xs pt-2'>Already have an account? <Link className='text-yellow-300 underline underline-offset-2' to='/login' draggable="false">Sign in.</Link></span>
            {authError && <AuthErrorPopup message= {authError}/>}
        </div>
    )
}
