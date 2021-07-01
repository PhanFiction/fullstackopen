import React from 'react';
import './button.css';

export default function Person({personList, deleteButton})
{
    return(
        <div>
            {
            personList.map(person => 
                <p key={person.id}> 
                    {person.name} {person.number} 
                        <button className="deleteButton" onClick={()=>{deleteButton(person)}}> 
                            delete 
                        </button>
                </p>
                )
            }
        </div>
    );
}