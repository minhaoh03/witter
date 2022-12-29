export function ExploreIcon(props) {
    const { active } = props

    const filled = "search"
    const outline = "search-outline"

    const data = active ? filled : outline
    return (
        <ion-icon name = { data }></ion-icon>
    )
}