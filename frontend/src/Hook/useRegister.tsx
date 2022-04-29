import axios from "axios";
import {LoginResponseInterface} from "../Interface/ResponsesInterfaces";

export default function useRegister() {
    return (username: string, password: string): Promise<LoginResponseInterface> => {
        return axios.post('http://localhost:2345/register.php', {
            withCredentials : true,
            data: new URLSearchParams({
                username: username,
                password: password
            })
        })
            .then(res => res.data)
    }
}
