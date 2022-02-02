import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs, createBlog } from './reducer/blogReducer';
import { fetchUser } from './reducer/authReducer';
import { initializeUsers } from './reducer/userReducer';
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlog from './components/CreateBlog'
import Toggable from './components/Toggable'
import DeleteButton from './components/DeleteButton'
import Notification from './components/Notification'

// for testing user
// test 
// 1234

const App = () => {

  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  const users = useSelector(state => state.users);

  console.log(blogs);

  const createBlogRef = useRef()

  // fetch user login from local storage
  useEffect(() => {

    dispatch(fetchUser());
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
  }, []);

  const toggleCreateBlog = () => (
    <Toggable buttonLabel={'create new blog'} ref={createBlogRef}>
      <CreateBlog/>
    </Toggable>
  )

  // display list of blogs
  const blog = () => (
    <div>
      <h2>blogs</h2>
      <Logout>
        {`${user.name} logged in`}
      </Logout>
      {toggleCreateBlog()}
      {blogs !== null ? 
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog}>
            <DeleteButton id={blog.id}/>
          </Blog>)
        : <h1>No blogs available</h1>
    }
    </div>
  )

  return (
    <div>
      <Notification />
      {
        user === null ? <Login /> : blog()
      }
    </div>
  )
}

export default App