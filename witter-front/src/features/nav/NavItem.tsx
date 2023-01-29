import React from 'react';
import { IonIcon } from '../../icons';

export function NavItem({ active, text, icon, }) {
    const bold = active ? 'font-bold' : 'font-normal'
    const iconName = active ? icon + 'Fill' : icon
    return (
        <div className={`${bold} flex font-ubuntu antialiased text-xl`}>
            <span className='ml-4 mt-[0.25rem]'> <IonIcon icon = {iconName}/> </span>
            <span className='ml-4 mt-1'>{text}</span>
        </div>
    );
}