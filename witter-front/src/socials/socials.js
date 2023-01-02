import { SearchBar } from "./SearchBar"

export function SocialBar(props) {
    return (
        <div className="sticky top-0 align-top inline-block h-screen w-[330px] min-w-[240px] border-l-[1px] border-gray-400/[0.5] text-white bg-black">
            <div id = 'content' className="ml-6 mt-2">
                <SearchBar/>
            </div>
        </div>
    )
}