import {BlogInterface} from "../Interface/ResponsesInterfaces";

export default function Blog({blog}: { blog: BlogInterface }) {
    return (
        <div className='bg-light rounded p-3 mb-3'>
            <h3>{blog.title}</h3>
            <p>
                <small>
                    Par : {blog.author}
                    <br/>
                    Le : {blog.date}
                </small>
            </p>
            <p>{blog.content}</p>
        </div>
    )
}
