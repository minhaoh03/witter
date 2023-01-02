import { useEffect, useState } from 'react';
import { Nav } from './Nav';
import { Logo } from '../logo';
import { WeetButton } from '../buttons'
import { UserAuth } from '../users';
import { getUser } from '../auth';

export async function NavBar() {
    const [user, setUser] = useState()
    useEffect(() => {
        async function fetchData() {
            let response = await getUser()
            response = await response.json()
            setUser(response)
        }
    }, [])

    console.log(user)

    return (
        <div className="sticky top-0 align-top h-screen inline-block ml-[10vw] w-[240px] min-w-[240px] border-r-[1px] border-gray-400/[0.5] text-white bg-black">
            <div className='ml-3 mb-2 pt-3'>
                <Logo color='#FEF3C7' />
            </div>
            <div>
                <Nav />
            </div>
            <div>
                <WeetButton />
            </div>
            <div>
                <UserAuth user={user} />
            </div>
        </div>
    )
}