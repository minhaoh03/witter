import React from 'react';

export function NavItem({ active, text, Icon, badge }) {
    return (
        <div className={`${active}`}>
            <div className=''>
                {badge && <div className=''></div>}
            </div>
            <span className=''>{text}</span>
        </div>
    );
}