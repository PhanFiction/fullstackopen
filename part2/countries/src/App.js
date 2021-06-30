import './App.css';
import React, {useState, useEffect} from 'react';
import Input from './components/Input.js';
import axios from 'axios';
import CountryList from './components/CountryList.js';
import Country from './components/Country.js';

function App() {

  const [word, setWord] = useState(''); // set input word
  const [countries, setCountries] = useState([]); // store countries

  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(result => {
        setCountries(result.data); // array obj holding countries
      })
  }, []);

  // filter out countries name 
  const filterCountries = countries.filter(country => country.name.toLowerCase().includes(word));
  
  // bind input from user
  const searchCountries = (event) => setWord(event.target.value.toLowerCase());

  // when use clicks button, it binds the countrys name to filter and display the info
  const handleCountry = (countryName) => setWord(countryName.toLowerCase());

  return (
    <div>
      <Input value={word} handleInput={searchCountries}/>
      {
        word.length === 0?
        <></>:
        
        filterCountries.length === 1?
        <Country country={filterCountries[0]}/>:

        filterCountries.length < 10?
        <CountryList countries={filterCountries} showInfo={handleCountry}/>:

        <p>Too many matches, specify another filter</p>
      }
    </div>
  );
}

export default App;
