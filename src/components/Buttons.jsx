import { Link } from "react-router"

export const sideBarButton = ({
    chatId,
    title
})=>{
    return (
        <Link to={`chat/${chatId}`}>
            {title}
        </Link>
    )
}

