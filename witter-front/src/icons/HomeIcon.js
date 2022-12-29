export function HomeIcon(props) {
    const { active } = props

    const filled = "home"
    const outline = "home-outline"

    const data = active ? filled : outline
    return (
        <ion-icon size="medium" name = { data }></ion-icon>
    )
}