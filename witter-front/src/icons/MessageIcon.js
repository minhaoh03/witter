export function MessageIcon(props) {
    const { active } = props

    const filled = "chatbox-ellipses"
    const outline = "chatbox-ellipses-outline"

    const data = active ? filled : outline
    return (
        <ion-icon name = { data }></ion-icon>
    )
}