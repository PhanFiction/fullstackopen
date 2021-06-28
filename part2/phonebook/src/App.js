import React, {useState} from 'react';
import Filter from './components/Filter.js';
import PersonForm from './components/PersonForm.js';
import Person from './components/Person.js';

import './App.css';

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-5323523', id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
    { name: 'Dan Abramov', number: '12-43-234345', id: 3},
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4},
  ]);

  const [newName, setNewName] = useState('');
  const [newNum, setNum] = useState('');
  const [filter, setFilter] = useState('');

  // add name to phonebook
  const addName = (event) => {
    event.preventDefault();

    const nameList = persons.map(person => person.name);

    if(nameList.includes(newName))
    {
      window.alert(`${newName} is already in the phonebook`); // template string `${}`
    }
    
    const nameObj = {
      name: newName,
      number: newNum,
      id: persons.length + 1,
    }

    // create new array to store person
    setPersons([...persons, nameObj]);
    //setPersons(persons.concat(nameObj)); //alternative
    setNewName('');
    setNum('');
  }

  const setName = (event) => {
    setNewName(event.target.value);
  }

  const setNumbers = (event) => {
    setNum(event.target.value);
  }

  const setFilt = (event) => {
    setFilter(event.target.value);
  }

  const filterList = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} setFilter={setFilt}/>
      <h3> Add a new</h3>
      <PersonForm submitTo={addName} setValue={newName} handleChange={setName} setValue2={newNum}
      handleChange2={setNumbers}/>
      <h3>Numbers</h3>
      <Person personList={filterList}/>
    </div>
  );
}

export default App;
