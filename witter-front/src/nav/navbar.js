import { Nav } from './Nav';
import { Logo } from '../logo';
import { WeetButton } from '../buttons'

export function NavBar() {
    return (
        <div className="sticky w-[240px] min-w-[240px] ml-[12.5%] border-r-[1px] border-gray-400/[0.5] text-white bg-black">
            <div className = 'ml-3 mb-2 mt-3'>
                <Logo />
            </div>
            <div>
                <Nav />
            </div>
            <div>
                <WeetButton/>
            </div>
        </div>
    )
}