import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../reducer/authReducer';

// store the login information into the local storage
export default function Login()
{
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  // handle login
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password));
    setUsername('')
    setPassword('')
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