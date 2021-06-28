import React from 'react';

export default function Person({personList})
{
    return(
        <div>
            {personList.map(person => <p key={person.id}> {person.name} {person.number} </p>)}
        </div>
    );
}