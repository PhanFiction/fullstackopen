import React from 'react'
import './blog.css'
import Toggable from './Toggable'

const Blog = ({ blog, children }) => {

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
