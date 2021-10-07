import React from 'react';

export default function Logout({children})
{
    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser');
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