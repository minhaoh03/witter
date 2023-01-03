import { Nav } from './Nav';
import { Logo } from '../logo';
import { WeetButton } from '../buttons'
import { UserAuth } from '../users';

export function NavBar(props) {
    const {user} = props

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
                <UserAuth user = {user}/>
            </div>
        </div>
    )
}