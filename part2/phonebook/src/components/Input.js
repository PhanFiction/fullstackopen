import React from 'react';

export default function Input({value, handleChange, text})
{
    return(
        <>
            <span>{text}</span>        
            <input value={value} onChange={handleChange}/>
        </>
    );
}