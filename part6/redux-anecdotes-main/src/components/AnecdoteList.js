import React from "react";
import { connect } from "react-redux";
import { updateVote } from "../reducers/anecdoteReducer";
import { showNotification } from '../reducers/notifcationReducer';

const AnecdoteList = (props) => {
    //const dispatch = useDispatch(); // to access dispatch function in store to make changes to state
    // state.anecdote from combineReducers {notification: ..., anecdote: ...}
    //const anecdotes = useSelector(state => state.anecdote); // searches for or selects data from redux store. Returns state

    const vote = (id, content) => {
        props.updateVote(id, content);
        props.showNotification(`You voted ${content}`);
    }

    return(
        <>
        {props.anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
            </div>
        )}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdote
    }
}

const mapDispatchToProps = {
    updateVote: updateVote,
    showNotification: showNotification  
}


export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);

//export default AnecdoteList;
