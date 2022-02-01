import React from 'react'
import './blog.css'
import Toggable from './Toggable'
import { useSelector } from 'react-redux';

const Blog = ({ children }) => {

  const blog = useSelector(state => state.blogs);

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
        {blog.title}
      </span>
      <Toggable buttonLabel={'view'}>
        <div>
          <span className="author">
            {blog.author}
          </span>
          <span className="url">
            {blog.url}
          </span>
        </div>
        <div className="buttonStyles">
            likes 0
          <button>likes</button>
        </div>
        {children}
      </Toggable>
    </div>
  )
}

export default Blog
