import React, {useState} from 'react';

function Button(props)
{
  return(
    <button onClick={props.handleClick}>
      {props.children}
    </button>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ];

  const [selected, setSelected] = useState(0)
  const [value, setVal] =  useState(new Array(anecdotes.length).fill(0));
  
  const randomText = () =>
  {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const setVoteClick = () =>
  {
    const newArr = [...value];
    newArr[selected] += 1;
    setVal(newArr);
  }

  const largestVote = () => {
    let max = 0;
    let index = 0;

    value.forEach((item, i) => {
      if(item > max) max = item; index = i;
    })

    return anecdotes[index] + ' has ' +  max + ' votes';
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {value[selected]} votes </p>
      <Button handleClick={setVoteClick}>
        vote
      </Button>
      <Button handleClick={randomText}>
        next anecdote
      </Button>
      <h1> Anecodes with the most votes </h1>
      {largestVote()}
    </div>
  )
}

export default App;
