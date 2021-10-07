import React from "react";
import './blog.css';
import blogService from '../services/blogs';

export default function CreateBlog(event)
{
    const [title, setTitle] = React.useState("");
    const [author, setAuthor] = React.useState("");
    const [url, setUrl] = React.useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        let newBlog = {
            title: title,
            author: author,
            url: url,
        }
        let savedBlog = await blogService.createBlog(newBlog);
        //console.log(savedBlog);
        
    }

    return(
        <div>
            <h1>create new</h1>
            <form onSubmit={handleSubmit} className="container">
                <label>
                    title
                    <input type="text" value={title} onChange={({target})=> setTitle(target.value)}/>
                </label>
                <label>
                    author
                    <input type="text" value={author} onChange={({target})=> setAuthor(target.value)}/>
                </label>
                <label>
                    url
                    <input type="text" value={url} onChange={({target})=> setUrl(target.value)}/>
                </label>
                <button>
                    create
                </button>
            </form>
        </div>
    )
}