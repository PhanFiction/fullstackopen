import React from "react";
import { useParams } from "react-router";

const Note = ({ notes }) => {
    const id = useParams().id;
    const note = notes.find(note => note.id === id);
    console.log(note);
    return(
        <div>
            <h2>{note.content}</h2>
            <div>{note.author}</div>
            <div>{note.info}</div>
            <div> votes {note.votes}</div>
        </div>
    )
}

export default Note;