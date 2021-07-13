import React from 'react';
import Button from './Button.js';
import Input from './Input.js';
import './styles/styles.css';

export default function PersonForm({submitTo, setValue, handleChange, setValue2, handleChange2})
{
    return(
        <div className="form-container">
            <form onSubmit={submitTo}>
                <div className="input-container">
                    <Input value={setValue} handleChange={handleChange} text={'Name'}/>
                    <Input value={setValue2} handleChange={handleChange2} text={'Number'}/>
                </div>
                <div className="button-container">
                    <Button/>
                </div>
            </form>
        </div>
    );
}