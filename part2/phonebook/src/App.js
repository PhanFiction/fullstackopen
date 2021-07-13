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
  const [filterPeople, setFilteredPeople] = useState([]);

  // renders the components body first before useEffect function takes place
  useEffect(()=>{
    phoneService
      .getAll()
      .then(result => {
        setPersons(result);
      })
  }, []);
  console.log('render');

  /**
   * 
   * @param {*} event 
   * create http request to update the phonebook to contain new Username and number
   */
  const addName = (event) => {
    event.preventDefault();
    const nameList = persons.map(person => person.name);

    const nameObj = {
      name: newName,
      number: newNum
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
            setNotification(`Added ${personID.name}`);
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
          setPersons([...returnedData]);
          //setPersons(persons.concat(returnedData));
          setNewName('');
          setNum('');
          setNotification(`Created ${nameObj.name}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
      })
    }
  }

  /**
   * 
   * @param {*} event
   * set name of the user  
   */
  const setName = (event) => {
    setNewName(event.target.value);
  }

  /**
   * 
   * @param {} event
   * set's the phone-number 
   */
  const setNumbers = (event) => {
    setNum(event.target.value);
  }

  /**
   * 
   * @param {*} event 
   * filter the name 
  */
  const setFilt = (event) => {
    setFilter(event.target.value.toLowerCase());
    setFilteredPeople(persons.filter(person => person.name.toLowerCase().includes(filter)));
  }


  /**
   * 
   * @param {*} e 
   * deleete the name and phone-number from the phonebook
   */
  const deletePerson = (e) => {
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

  return (
    <>
    <div className="adding-contacts">
      <div className="header-wrapper">
          <h1>Phonebook</h1>
          <PersonForm submitTo={addName} setValue={newName} handleChange={setName} setValue2={newNum} 
            handleChange2={setNumbers}/>
      </div>
    </div>

    <div className="phonebook-container">
      <div className="wrapper">
        <div className="searchBox">
          <Notification message={notification}/>
          <Filter value={filter} setFilter={setFilt}/>
        </div>
        <h2 id="info">List of Name and Numbers</h2>
        {
          filter === '' ? 
            <Person personList={persons}deleteButton={deletePerson}/>
            : 
            <Person personList={filterPeople} deleteButton={deletePerson}/>
        }
      </div>
    </div>
    </>
  );
}

export default App;