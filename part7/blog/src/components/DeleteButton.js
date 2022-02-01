import React from 'react'
import blogService from '../services/blogs'

const DeleteButton = ( { id, blogs, setBlogs } ) => {

  const handleDelete = async (e) => {
    e.preventDefault()

    if(window.confirm('Do you really want to delete this blog?')){
      try{
        await blogService.deleteBlog(id);
        console.log('Deleted sucessfully')
        setBlogs(blogs.filter(blog => blog.id !== id)) // remove deleted blog from blogs
      }catch(error){
        console.log(error)
      }
    }
  }
  return(
    <button onClick={handleDelete}>
      delete
    </button>
  )
}

export default DeleteButton;