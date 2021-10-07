import React, { useState } from 'react'
import loginService from '../services/login';
import blogService from '../services/blogs';

// store the login information into the local storage
export default function Login()
{

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
          const user = await loginService.login({
            username, password
          })
          // if user is sucessful in logging in, store the username and password into the localStorage of the browser
          // values saved to the storage are DOMstrings, so we cannot save a JavaScript object as is. The object has to be parsed to JSON first,
          window.localStorage.setItem('loggedUser', JSON.stringify(user));
          blogService.setToken(user.token);
          setUsername('')
          setPassword('')
        }catch (exception) {
          console.log("wrong credentials");
        }
      }

    return(
        <>
          <h2>Log in application</h2>
          <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
}