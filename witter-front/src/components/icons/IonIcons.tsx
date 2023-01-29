import { ioniconMap as iconMap } from './ioniconsHelper'

export function IonIcon(props) {
    let {icon, size, styles} = props
    icon = iconMap[icon]
    return (
        <ion-icon style = {styles} size = {size} name = {icon}/>
    )
}