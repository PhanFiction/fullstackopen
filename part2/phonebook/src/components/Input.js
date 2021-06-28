import React from 'react';

export default function Input({value, handleChange, text})
{
    return(
        <div>
            {text} <input value={value} onChange={handleChange}/>
        </div>
    );
}