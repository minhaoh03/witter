import { Link } from 'react-router-dom'
import React from 'react'

export function WeetButton() {
    return (
        <Link
            className=''
            to='/home'
            draggable="false"
        >
        <button className='font-fira font-bold rounded-full antialiased w-[90%] mt-2 px-12 py-3 bg-yellow-500 text-white/75 hover:bg-yellow-500/[.8] duration-200'> Weet </button>
        </Link>
    )
}