import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'https://restcountries.com/v2/name';

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if(name !== '')
        {
            axios.get(`${baseUrl}/${name}`)
                .then(res => setCountry(
                    {
                        data: res.data[0],
                        found: true
                    }
                ));
        }
    }, [name]);

    return country
}