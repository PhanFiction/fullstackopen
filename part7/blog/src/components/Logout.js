import React from 'react';
import { logout } from '../reducer/authReducer';
import { useDispatch } from 'react-redux';

export default function Logout({ children })
{
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
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