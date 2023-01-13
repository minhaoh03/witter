import { SearchBar } from "./SearchBar"

export function SocialBar(props) {
    return (
        <div className="sticky top-0 align-top inline-block h-screen w-[30%] min-w-[30%] border-l-[1px] border-gray-400/[0.5] text-white bg-black">
            <div id = 'content' className="ml-6 mt-2 w-[60%]">
                <SearchBar/>
                <div className='animate-pulse mt-4 bg-white/[0.1] rounded-lg w-full h-48'>

                </div>
                <div className='animate-pulse mt-10 bg-white/[0.1] rounded-lg w-full h-80'>

                </div>
            </div>
        </div>
    )
}