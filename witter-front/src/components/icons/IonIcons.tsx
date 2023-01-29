import { ioniconMap as iconMap } from './ioniconsHelper'

interface IonIconProps {
    icon: string,
    size: string,
    styles: string,
}

export function IonIcon(props: IonIconProps) {
    let {icon, size, styles} = props
    icon = iconMap[icon]
    return (
        <ion-icon style = {styles} size = {size} name = {icon}/>
    )
}