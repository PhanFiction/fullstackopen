import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlog from './components/CreateBlog'
import Toggable from './components/Toggable'
import DeleteButton from './components/DeleteButton'
import Notification from './components/Notification'

// for testing user
// Alex515
// Alex

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const createBlogRef = useRef()

  // fetch user login from local storage
  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if(loggedUserJSON)
    {
      const user = JSON.parse(loggedUserJSON) // parse DOMstrings to JSON
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [])

  const toggleCreateBlog = () => (
    <Toggable buttonLabel={'create new blog'} ref={createBlogRef}>
      <CreateBlog updateBlog={setBlogs} blogs={blogs}/>
    </Toggable>
  )

  //console.log(blogs)

  // display list of blogs
  const blog = () => (
    <div>
      <h2>blogs</h2>
      <Logout setUser={setUser}>
        {`${user.name} logged in`}
      </Logout>
      {toggleCreateBlog()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}>
          <DeleteButton id={blog.id} setBlogs={setBlogs} blogs={blogs}/>
        </Blog>
      )}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage}/>
      {
        user === null ? <Login setUser={setUser} setBlogs={setBlogs} setErrorMessage={setErrorMessage}/> : blog()
      }
    </div>
  )
}

export default App