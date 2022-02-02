import React from 'react'
import './blog.css'
import Toggable from './Toggable'
import { updateLike } from '../reducer/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, children }) => {
  const dispatch = useDispatch();

  if(blog === null || blog === undefined){
    return(
      <h1>
        Empty 
      </h1>
    )
  }

  return(
    <div className="blogStyle">
      <span className="title">
        title {blog.title}
      </span>
      <Toggable buttonLabel={'view'}>
        <div>
          <span className="author">
            author {blog.author}
          </span>
        </div>
        <div>
          <span className="url">
            url {blog.url}
          </span>
        </div>
        <div className="buttonStyles">
            likes {blog.likes}
          <button onClick={()=>{dispatch(updateLike(blog))}}>likes</button>
        </div>
        {children}
      </Toggable>
    </div>
  )
}

export default Blog
