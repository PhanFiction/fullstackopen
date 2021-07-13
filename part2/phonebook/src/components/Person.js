import React from 'react';
import './styles/button.css';

export default function Person({personList, deleteButton})
{
    const people = personList.filter(person => person.name);
    return(
        <div>
            {
             people.map(person => 
                <p key={person.id}> 
                    Name: {person.name + ';    Phone Number: '} 
                    {person.number} 
                        <button className="deleteButton" onClick={()=>{deleteButton(person)}}> 
                            delete 
                        </button>
                </p>
                )
            }
        </div>
    );
}