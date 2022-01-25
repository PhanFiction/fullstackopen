import React from 'react'
import { useField } from '../hooks';
import {
    useHistory
} from "react-router-dom";


const CreateNew = (props) => {
    const content = useField("text");
    const author = useField("text");
    const info = useField("text");
    const history = useHistory()
  
  
    const handleSubmit = (e) => {
      e.preventDefault()

      console.log(content.value);

      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })

      props.setNotification(content.value);

      setTimeout(()=>{
        props.setNotification('')
      }, 10000)

      history.push('/anecdotes')
    }

    const handleReset = () => {
      content.reset();
      author.reset();
      info.reset();
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' value={content.value} onChange={content.onChange} />
          </div>
          <div>
            author
            <input name='author' value={author.value} onChange={author.onChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={info.value} onChange={info.onChange} />
          </div>
          <button>create</button>
          <button onClick={handleReset}>reset</button>
        </form>
      </div>
    )
}

export default CreateNew;
