import { Link } from 'react-router-dom';
import { LogoIcon } from '../icons';

export function Logo() {
    return (
        <Link
            className=''
            to='/'
            draggable="false"
        >
            <LogoIcon/>
        </Link>
    )
}