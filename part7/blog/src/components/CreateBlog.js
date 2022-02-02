import React from 'react';
import './blog.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducer/blogReducer';

export default function CreateBlog()
{
  const dispatch = useDispatch();

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
    dispatch(createBlog(newBlog));
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

/* CreateBlog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
} */