import React, {useState, useEffect} from 'react';
import Filter from './components/Filter.js';
import PersonForm from './components/PersonForm.js';
import Person from './components/Person.js';
import './App.css';
import axios from 'axios';


function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNum] = useState('');
  const [filter, setFilter] = useState('');

  // renders the components body first before useEffect function takes place
  useEffect(()=>{
    // get promise from the server 
    // which returns a object representing the eventual completion
    axios
      .get('http://localhost:3001/persons')
      // add event handler which is a call back function that would take in the obj inside promise
      .then((result)=>{ 
        //setPerson to obj.data and ignore the other data such as header and content type
        setPersons(result.data); // if change in state, re-renders the whole component
      })
  }, []);

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

  const filterNames = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} setFilter={setFilt}/>
      <h3> Add a new</h3>
      <PersonForm submitTo={addName} setValue={newName} handleChange={setName} setValue2={newNum}
      handleChange2={setNumbers}/>
      <h3>Numbers</h3>
      <Person personList={filterNames}/>
    </div>
  );
}

export default App;

/*
1. #0
2. #
information of existing cal works case press 2
information of existing cal fresh case press 3
information of existing medical case press 4
information  of existing general existance case press 5
if you are calling about ssn ssi or medical or plan d press 6
*/