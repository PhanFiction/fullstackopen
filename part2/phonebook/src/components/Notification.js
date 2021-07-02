import React from 'react';
import './styles/styles.css';


export default function Notification ({ message })
{
    if (message === null) {
        return null
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}