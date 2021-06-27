import React from 'react';
import './total.css';

export default function Total({parts})
{   
    // arr.reduce(callback(acc, curVal, index, src), initVal);
    const total = parts.reduce((total, part) => 
    total + part.exercises ,0);
    return(
        <p id="total">
           total of {total} exercises
        </p>
    );
}