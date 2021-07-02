import React, {useState, useEffect} from 'react';
import Filter from './components/Filter.js';
import PersonForm from './components/PersonForm.js';
import Person from './components/Person.js';
import './App.css';
import phoneService from './services/phonebook.js';
import Notification from './components/Notification.js';


function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNum] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  // renders the components body first before useEffect function takes place
  useEffect(()=>{
    phoneService
      .getAll()
      .then(result => {
        setPersons(result);
      })
  }, []);

  // add name to phonebook
  const addName = (event) => {
    event.preventDefault();

    const nameList = persons.map(person => person.name);

    const nameObj = {
      name: newName,
      number: newNum,
    }

    if(nameList.includes(newName))
    {
      const updateInfo = window.confirm(`${newName} is already in the phonebook. Would you like to replace the old number with a new one`); // template string `${}`

      if(updateInfo === true)
      {
        const personID = persons.find(person => person.name === newName);

        phoneService
          .update(personID.id, nameObj)
          .then(returnedData => {
            setPersons(persons);
            setNewName('');
            setNum('');
            setNotification(`Added ${personID.name}`)
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch(error => {
            console.log(error);
          })
      }
    }else{
      //create new person
      phoneService
        .create(nameObj)
        .then(returnedData => {
          setPersons([...persons, returnedData]);
          //setPersons(persons.concat(returnedData));
          setNewName('');
          setNum('');
          setNotification(`Created ${nameObj.name}`)
          setTimeout(() => {
            setNotification(null);
          }, 5000);
      })
    }
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


  const deleteName = (e) => {
    const result = window.confirm(`delete ${e.name}`);
    //const updateBook = persons.filter(person => person.id !== e.id);

    if(result === true)
    {
      phoneService
        .deleteName(e.id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== e.id));
          setNotification(`Deleted ${e.name}`)
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch(error => {
          setNotification(`information of ${e.name} has already been removed from the server`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
    }
  }

  const filterNames = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter value={filter} setFilter={setFilt}/>
      <h3> Add a new</h3>
      <PersonForm submitTo={addName} setValue={newName} handleChange={setName} setValue2={newNum}
      handleChange2={setNumbers}/>
      <h3>Numbers</h3>
      <Person personList={filterNames} deleteButton={deleteName}/>
    </div>
  );
}

export default App;