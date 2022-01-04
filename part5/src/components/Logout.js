import React from 'react'

export default function Logout({ setUser, children })
{
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  return(
    <div>
      {children}
      <button onClick={handleLogout}>
                logout
      </button>
    </div>
  )
}