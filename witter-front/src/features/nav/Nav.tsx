import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from './NavItem';
import { navItems } from "./tabsHelper";

export function Nav() {
    const [items, setItems] = useState(navItems);

    function handleClick(text) {
        const _items = [...items];
        const match = _items.find((item) => item.text === text);
        if (match) {
            _items.forEach((item) => {
                item.active = item.text === text;
            });

            setItems(_items);
        }
    }

    function generateNavItem({ path, icon, text, active }, index) {
        if (text === 'More') {      // More tab, change in future
            return (
                <span key={index} className='border-black mr-8 py-2.5 hover:bg-gray-500/50 duration-200 border-2 rounded-full'>
                    <NavItem
                        key={index}
                        text={text}
                        active={active}
                        icon={icon}
                    />
                </span>
            );
        } else {
            return (
                <Link
                    key={index}
                    className='border-black mr-8 py-2.5 hover:bg-gray-500/50 duration-200 border-2 rounded-full'
                    to={path}
                    onClick={() => handleClick(text)}
                    draggable="false"
                >
                    <NavItem icon={icon} text={text} active={active} />
                </Link>
            );
        }
    }

    return (
        <div className='flex flex-col'>
            {items.map((navItem, index) => generateNavItem(navItem, index))}
        </div>
    );
}