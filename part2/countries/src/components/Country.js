import React, {useEffect, useState} from 'react';
import axios from 'axios';
const apiKey = process.env.REACT_APP_API_KEY;

export default function Country({country})
{
    const [weather, setWeather] = useState({});

    useEffect(()=>{
        axios
            .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`)
            .then( response => {
                setWeather(response.data);
            })
    },[country.capital]);

    
    return(
        <div>
            <h1>{country.name}</h1>
            <p> Capital: {country.capital}</p>
            <p> Population: {country.population}</p>
            <h2>Spoken Languages</h2>
            <ul>
                {country.languages.map(language => 
                    <li key={language.name}>
                        {language.name}
                    </li>
                )}
            </ul>
            <img src={country.flag} alt="flag" width={150} height={125}/>
            <h2>Weather in {country.capital}</h2>
            {
                Object.keys(weather).length !== 0?
                <>
                    <p>
                        <b>Temperature:</b> {weather.current.temperature}
                    </p>
                    <img src={weather.current.weather_icons[0]} alt="weather-img"/>
                    <p>
                        <b>Wind:</b> {weather.current.wind_speed}
                    </p>
                </>:
                <></>
            }
        </div>
    );
}