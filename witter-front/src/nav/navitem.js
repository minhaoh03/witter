import React from 'react';

export function NavItem({ active, text, Icon }) {
    const bold = active ? 'font-bold' : 'font-normal'
    return (
        <div className={`${bold}` + ' flex font-ubuntu antialiased text-lg border-black mr-12 py-2 hover:bg-gray-500/50 duration-200 border-2 rounded-full'}>
            <span className='ml-4 mt-[0.25rem]'> <Icon active = {active}/> </span>
            <span className='ml-4 mt-1'>{text}</span>
        </div>
    );
}