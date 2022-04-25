import {LoginResponseInterface} from "../Interface/ResponsesInterfaces";

export default function useLogin() {
    return (username: string, password: string): Promise<LoginResponseInterface> => {
        return fetch('http://localhost:2345/login.php', {
            method: 'GET',
            mode: 'cors',
            credentials: "include",
            headers: {
                Authorization: `Basic ${btoa(username + ':' + password)}`
            }
        })
            .then(res => res.json())
    }
}
