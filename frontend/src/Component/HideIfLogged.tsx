import {LoginResponseInterface} from "../Interface/ResponsesInterfaces";

interface HideIfLoggedPropsInterface {
    loggedUser: LoginResponseInterface,
    children: JSX.Element
}

export default function HideIfLogged({loggedUser, children}: HideIfLoggedPropsInterface) {
    if (loggedUser.token) {
        return <></>
    }
    return children
}
