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

    function generateNavItem({ path, Icon, text, active }, index) {
        if (text === 'More') {      // More tab, change in future
            return (
                <NavItem
                    key={index}
                    Icon={Icon}
                    text={text}
                    active={active}
                />
            );
        } else {
            return (
                <Link
                    key={index}
                    className=''
                    to={path}
                    onClick={() => handleClick(text)}
                    draggable="false"
                >
                <NavItem Icon={Icon} text={text} active={active} />
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