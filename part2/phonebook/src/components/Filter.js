import React from 'react';

export default function Filter({filterWords, setFilter})
{
    return(
    <div>
        filter shown with 
        <input value={filterWords} onChange={setFilter}/>
    </div>
    );
}