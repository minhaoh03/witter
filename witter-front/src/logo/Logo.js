import { Link } from 'react-router-dom';
import { IonIcon } from '../icons';

export function Logo(props) {
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