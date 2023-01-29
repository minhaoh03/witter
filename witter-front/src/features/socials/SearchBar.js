import { IonIcon } from "../../icons";

export function SearchBar() {
    return (
        <div>
            <span className="absolute text-gray-500 ml-4 mt-[0.65rem] focus:text-yellow-300"><IonIcon size='small' icon='explore'/></span>
            <input type='text' placeholder="Search Witter" className="w-full pl-12 pr-2 py-2.5 rounded-full border-[1px] border-black font-roboto text-gray-300 text-[0.85rem] bg-gray-800 outline-none focus:border-yellow-300 focus:bg-black"/>
        </div>
        
    )
}