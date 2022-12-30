import { ioniconMap as iconMap } from './ioniconsHelper'

export function IonIcon(props) {
    let {icon, size, styles} = props
    icon = iconMap[icon]
    return (
        <span className={styles}><ion-icon size = {size} name = {icon}/></span>
    )
}