import React from 'react';
import Part from './Part.js';
import Total from './Total.js';

/**
 * Content uses Array.prototype.map to iterate through object array
 */
export default function Content({parts})
{
    return(
        <>
            {parts.map(part => 
                <Part key={part.id} name={part.name} exercise={part.exercises}/>,
                )}
        </>
    )
}