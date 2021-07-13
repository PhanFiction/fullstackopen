import React from 'react';
import './styles/styles.css';

export default function Filter({filterWords, setFilter})
{
    return(
    <div className="filter-container">
        <h2>Search Contact</h2>  
        <div className="filter-box">
            <span>Name</span>
            <input value={filterWords} onChange={setFilter}/>
        </div>
    </div>
    );
}