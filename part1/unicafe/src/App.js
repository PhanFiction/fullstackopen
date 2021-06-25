import './App.css';
import React, {useState} from 'react';

// lifting state up
export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleBad = () =>{
    setBad(bad + 1);
  }

  const handleGood = () =>{
    setGood(good + 1);
  }

  const handleNeutral = () =>{
    setNeutral(neutral + 1);
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <div className="button-container">
        <Button handleClick={handleGood}>good</Button>
        <Button handleClick={handleBad}>bad</Button>
        <Button handleClick={handleNeutral}>neutral</Button>
      </div>
      <h1>statistics</h1>
      <Display number={good}> good </Display> 
      <Display number={bad}> bad </Display> 
      <Display number={neutral}> neutral </Display>  
    </div>
  );
}

function Display(props)
{
  const {children} = props;
  return(
    <p>
      {children} {props.number}
    </p>
  );
}
function Button(props)
{
  return(
    <button onClick={props.handleClick}>
      {props.children}
    </button>
  )
}

