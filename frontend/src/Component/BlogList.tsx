import {BlogInterface} from "../Interface/ResponsesInterfaces";
import Blog from "./Blog";

export default function BlogList({blogList}: { blogList: BlogInterface[] }) {
    return (
        <div className='p-5'>
            <h1 className='text-center mb-5'>Tous les blogs</h1>
            {blogList.map((blog: BlogInterface) => (
                <Blog blog={blog} key={blog.id}/>
            ))}
        </div>
    )
}
