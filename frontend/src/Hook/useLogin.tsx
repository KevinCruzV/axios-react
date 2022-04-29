import axios from "axios";
import {LoginResponseInterface} from "../Interface/ResponsesInterfaces";


export default function useLogin() {
    return (username: string, password: string): Promise<LoginResponseInterface> => {
        return axios.get('http://localhost:2345/login.php', {
            withCredentials: true,

            auth: {
                username: username,
                password: password
            }

        })
            .then(res => res.data)
    }
}
