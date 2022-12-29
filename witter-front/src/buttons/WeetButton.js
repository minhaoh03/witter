import { Link } from 'react-router-dom'

export function WeetButton() {
    return (
        <Link
            className=''
            to='/weet'
            draggable="false"
        >
        <button className='font-fira rounded-full antialiased mt-2 px-24 py-3 bg-yellow-500 text-black hover:bg-yellow-500/[.8] duration-200'> Weet </button>
        </Link>
    )
}