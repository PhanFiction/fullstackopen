import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'

test('Test Blog component', ()=>{

    const blog = {
        title: 'Test blog',
        author: "Test author",
        url: ""
    }
    const component = render(
        <Blog blog={blog}/>
    )

    //component.debug()

/*     const div = component.container.querySelector('.blogStyle')
    expect(div).toHaveTextContent('Test blog');
    expect(div).toHaveTextContent('Test author'); */

    const title = component.container.querySelector('.title')
    console.log(prettyDOM(title))
    const author = component.container.querySelector('.author')
    console.log(prettyDOM(author))

});

// 