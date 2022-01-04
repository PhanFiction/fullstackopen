import React from 'react'
import './blog.css'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

export default function CreateBlog({ updateBlog, blogs })
{
  const [title, setTitle] = React.useState('')
  const [author, setAuthor] = React.useState('')
  const [url, setUrl] = React.useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    let newBlog = {
      title: title,
      author: author,
      url: url,
    }
    let savedBlog= await blogService.createBlog(newBlog)
    // update blog object
    updateBlog(blogs.concat(savedBlog))

    //console.log(savedBlog);
  }

  return(
    <div>
      <h1>create new</h1>
      <form onSubmit={handleSubmit} className="container">
        <label>
          title
          <input id="title" type="text" value={title} onChange={({ target }) => setTitle(target.value)}/>
        </label>
        <label>
          author
          <input id="author" type="text" value={author} onChange={({ target }) => setAuthor(target.value)}/>
        </label>
        <label>
          url
          <input id="url" type="text" value={url} onChange={({ target }) => setUrl(target.value)}/>
        </label>
        <button id="createBlog">
          create
        </button>
      </form>
    </div>
  )
}

CreateBlog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
}