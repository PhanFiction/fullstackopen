import React, {useState} from 'react';

function Statistic({value, text})
{
  return(
    <tr>
      <td> {text} {value} </td>
    </tr>
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

function Statistics(props)
{
  const {good, bad, neutral, all, avg, positive} = props;
  if(good === 0 && bad === 0 && neutral === 0) 
  {
    return(
      <h2 id="nofeedback"> no feedback given </h2>
    );
  }
  return(
    <table>
      <tbody>
        <Statistic text={'good'} value={good}/>
        <Statistic text={'neutral'} value={neutral}/>
        <Statistic text={'bad'} value={bad}/>
        <Statistic text={'all'} value={all}/>
        <Statistic text={'average'} value={avg}/>
        <Statistic text={'positive'} value={positive}/>
      </tbody>
    </table>
  )
}

// lifting state up
export default function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const avg = (good - bad) / all;
  const positive = (good / all) * 100+ '%';

  const handleBad = () =>{
    setBad(bad + 1);
  }

  const handleGood = () =>{
    setGood(good + 1);
  }

  const handleNeutral = () =>{
    setNeutral(neutral+1);
  }
  
  return (
    <>
      <h1> give feedback</h1>
      <Button handleClick={handleGood}>good</Button>
      <Button handleClick={handleBad}>bad</Button>
      <Button handleClick={handleNeutral}>neutral</Button>
      <h1> statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} avg={avg} positive={positive}/>
      </>
  );
}