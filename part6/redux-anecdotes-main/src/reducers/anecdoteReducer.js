import noteService from "../service/notes"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case "VOTE": 
      const id = action.data.id;

      const newArr = state.map(item => {

        if(item.id === id){
          return {...item, votes: item.votes + 1}
        }
        return item;
      })
      return newArr;

    case "INIT_NOTES":
      return action.data;

    case "CREATE": 
      let notes = [...state];
      return notes.concat(action.notes)

    default: 
      return state
  }
}

export const updateVote = (id, voteObj) => {
  return async dispatch => {
    const updateVote = {
      ...voteObj,
      votes: voteObj.votes + 1
    }

    await noteService.updateVote(id, updateVote);

    dispatch({
      type: "VOTE",
      data: { id }
    })
  }
}

export const createNote = (data) => {
  return async dispatch => {
    const notes = await noteService.createNote(data);
    dispatch({
      type: "CREATE",
      notes,
    })
  }
}

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll();
    dispatch({
      type: "INIT_NOTES",
      data: notes,
    })
  }
}

export default anecdoteReducer