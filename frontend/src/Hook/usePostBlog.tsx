import {LocalBlogPost} from "../Interface/LocalBlogPost";
import axios from "axios";

export default function usePostBlog() {
    return (token: string, blog: LocalBlogPost) => {
        return axios.post('http://localhost:2345/post-blog.php', {
            credentials: true,
            // Ici aussi je pourrais me passer de passer le token en
            // Bearer et juste le passer par cookie (qui est envoyé
            // automatiquement et le récupérer en PHP !
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: new URLSearchParams({
                title: blog.title,
                content: blog.content
            })
        })
            .then(res => res.data)
    }
}
