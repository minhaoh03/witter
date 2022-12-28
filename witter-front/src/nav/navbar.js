import { Nav } from './nav';

export function NavBar(props) {
    return (
        <div className="sticky w-270px min-w-270px ml-[12.5%] border-2 text-white bg-black">
            <div>
                <Nav />
            </div>
        </div>
    )
}