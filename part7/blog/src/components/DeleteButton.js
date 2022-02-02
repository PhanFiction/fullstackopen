import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBlog } from '../reducer/blogReducer';

const DeleteButton = ( { id } ) => {
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault()

    if(window.confirm('Do you really want to delete this blog?')){
      dispatch(deleteBlog(id));
    }
  }
  return(
    <button onClick={handleDelete}>
      delete
    </button>
  )
}

export default DeleteButton;