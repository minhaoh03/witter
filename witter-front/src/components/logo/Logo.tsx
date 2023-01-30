import { Link } from 'react-router-dom';
import { IonIcon } from '../icons';
import React from 'react'

interface LogoProps {
    color: string,
}

export function Logo(props: LogoProps) {
    let {color} = props
    return (
        <Link
            className=''
            to='/home'
            draggable="false"
        >
            <IonIcon icon='logoFill' size='large' styles={{color: color}}/>
        </Link>
    )
}