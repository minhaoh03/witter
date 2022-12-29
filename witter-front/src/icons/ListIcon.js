export function ListIcon(props) {
    const { active } = props
    
    const filled = "reader"
    const outline = "reader-outline"

    const data = active ? filled : outline
    return (
        <ion-icon name = { data }></ion-icon>
    )
}