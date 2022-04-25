import React, {useState} from "react";
import {LocalBlogPost} from "../Interface/LocalBlogPost";
import usePostBlog from "../Hook/usePostBlog";
import {BlogInterface, LoginResponseInterface} from "../Interface/ResponsesInterfaces";

interface BlogFormPropsInterface {
    loggedUser: LoginResponseInterface,
    setNeedsUpdate: React.Dispatch<boolean>
}

export default function BlogForm({loggedUser, setNeedsUpdate}: BlogFormPropsInterface) {
    const [localBlog, setLocalBlog] = useState<LocalBlogPost>({content: "", title: ""})
    const postBlog = usePostBlog();

    const handleChange = ({target}: any) => {
        setLocalBlog(prev => ({
            ...prev,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (loggedUser.token != null) {
            postBlog(loggedUser.token, localBlog)
                .then(data => {
                    console.log(data)
                    setLocalBlog({content: "", title: ""})
                    setNeedsUpdate(true);
                })
        }
    }

    return (
        <form className='mx-auto' style={{maxWidth: '350px'}} onSubmit={handleSubmit}>
            <h2 className='mb-3 text-center'>Feel like a writer ?</h2>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="title"
                       name='title' onChange={handleChange} value={localBlog.title}/>
                <label htmlFor="floatingInput">Title</label>
            </div>
            <div className="mb-3 form-floating">
                <textarea className="form-control" placeholder="Write here" id="floatingTextarea" name='content'
                          style={{height: '100px'}} onChange={handleChange} value={localBlog.content}/>
                <label htmlFor="floatingTextarea">Content</label>
            </div>
            <button type='submit' className='btn btn-primary w-100'>Send</button>
        </form>
    )
}
