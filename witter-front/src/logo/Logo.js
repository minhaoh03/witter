import { Link } from 'react-router-dom';
import { IonIcon } from '../icons';

export function Logo() {
    return (
        <Link
            className=''
            to='/'
            draggable="false"
        >
            <IonIcon icon='logoFill' size='large' styles='text-yellow-300'/>
        </Link>
    )
}