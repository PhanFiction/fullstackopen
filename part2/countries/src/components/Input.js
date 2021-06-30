import React from 'react';
import './styles.css';

export default function Input({value, handleInput})
{
    return(
        <div className="input-type">
            find countries <input input={value} onChange={handleInput}/>
        </div>
    );
}

/**
 * get address
 * update campus 
 * 
 */