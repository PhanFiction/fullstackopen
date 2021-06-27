import React from 'react';
import Header from './Header.js';
import Content from './Content.js';
import Total from './Total.js';


export default function Course({course, parts})
{
    return(
        <>
            <Header header={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </>
    );  
}