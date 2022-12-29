export function BookmarkIcon(props) {
    const { active } = props
    
    const filled = "bookmark"
    const outline = "bookmark-outline"

    const data = active ? filled : outline
    return (
        <ion-icon name = { data }></ion-icon>
    )
}