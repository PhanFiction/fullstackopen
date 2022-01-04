import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

// store the login information into the local storage
export default function Login({ setUser, setBlogs, setErrorMessage })
{
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      // if user is sucessful in logging in, store the username and password into the localStorage of the browser
      // values saved to the storage are DOMstrings, so we cannot save a JavaScript object as is. The object has to be parsed to JSON first,
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
      setUsername('')
      setPassword('')
    }catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return(
    <>
      <h2>Log in application</h2>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login" type="submit">login</button>
      </form>
    </>
  )
}