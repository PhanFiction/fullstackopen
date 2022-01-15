import React from 'react';
import { connect } from 'react-redux';
import { createNote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notifcationReducer';


const AnecdoteForm = (props) => {
    const [note, setNote] = React.useState('');
    //const dispatch = useDispatch();

    const setNoteChange = (e) => {
        setNote(e.target.value)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        props.createNote(note);
        props.showNotification(`${note} has been created`);
        //dispatch(createNote(note))
        //dispatch(showNotification(`${note} has been created`))
        setNote('');
    }

    return(
        <>
            <h2>create new</h2>
            <form>
                <div>
                <input
                    value={note}
                    onChange={setNoteChange}
                    id="note"
                />
                </div>
                <button onClick={handleSubmit}>create</button>
            </form>
        </>
    )
}
const mapDispatchToProps = {
    showNotification: showNotification,
    createNote: createNote,
  }

// first param needs to access state but since this componenent doesnt need that we pass in null
export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)