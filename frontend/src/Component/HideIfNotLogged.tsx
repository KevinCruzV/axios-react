import {LoginResponseInterface} from "../Interface/ResponsesInterfaces";
import React from "react";

interface HideIfNotLoggedPropsInterface {
    loggedUser: LoginResponseInterface,
    children: any
}

export default function HideIfNotLogged({loggedUser, children}: HideIfNotLoggedPropsInterface) {
    if (!loggedUser.token) {
        return <></>
    }
    return children
}
