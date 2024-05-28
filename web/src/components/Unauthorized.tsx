import {useUser} from "../UserContext.ts";
import {ReactElement} from "react";

export default function Unauthorized(props: {children: ReactElement}) {
    const user = useUser()
    return (
        user === null && props.children
    )
}