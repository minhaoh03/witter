export function ProfileIcon(props) {
    const { active } = props

    const filled = "person"
    const outline = "person-outline"

    const data = active ? filled : outline
    return (
        <ion-icon name = { data }></ion-icon>
    )
}