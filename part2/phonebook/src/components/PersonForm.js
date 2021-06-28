import React from 'react';
import Button from './Button.js';
import Input from './Input.js';

export default function PersonForm({submitTo, setValue, handleChange, setValue2, handleChange2})
{
    return(
        <form onSubmit={submitTo}>
            <Input value={setValue} handleChange={handleChange} text={'name:'}/>
            <Input value={setValue2} handleChange={handleChange2} text={'number:'}/>
            <Button/>
        </form>
    );
}