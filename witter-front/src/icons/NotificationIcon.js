export function NotificationIcon(props) {
    const { active } = props

    const filled = "notifications"
    const outline = "notifications-outline"

    const data = active ? filled : outline
    return (
        <ion-icon name = { data }></ion-icon>
    )
}