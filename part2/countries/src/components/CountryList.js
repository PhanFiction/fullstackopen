import React from 'react';

export default function CountryList({countries, showInfo})
{
    // returns a 
    return (
        <div>
            {countries.map(c =>
                <p key={c.name}>
                    {c.name}
                    <button onClick={()=>showInfo(c.name)}>show</button>
                </p>
            )}
        </div>
    );
}