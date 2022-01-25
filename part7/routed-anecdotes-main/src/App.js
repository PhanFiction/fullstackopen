import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route,
} from "react-router-dom";
import Note from './Note';
import Menu from './Components/Menu';
import AnecdoteList from './Components/AnecdoteList';
import About from './Components/About';
import Footer from './Components/Footer';
import CreateNew from './Components/CreateNew';


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        {
          notification !== ''
          ? <p> {notification} has been created </p>
          : null
        }
        <Switch>
          <Route path="/anecdotes/:id">
            <Note notes={anecdotes} />
          </Route>
          <Route path="/anecdotes">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/create">
            <CreateNew addNew={addNew} setNotification={setNotification}/>
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default App;