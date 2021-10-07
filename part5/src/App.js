import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login';
import Logout from './components/Logout';
import CreateBlog from './components/CreateBlog';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);

  // fetch user login from local storage
  useEffect(()=> {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    
    if(loggedUserJSON)
    {
      const user = JSON.parse(loggedUserJSON); // parse DOMstrings to JSON
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, []);

  const login = () => (
    <Login/>
  )

  const blog = () => (
    <div>
      <h2>blogs</h2>
      <Logout>
        {`${user.name} logged in`}
      </Logout>
      <CreateBlog/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {
        user === null ? login() : blog()
      }
    </div>
  )
}

export default App