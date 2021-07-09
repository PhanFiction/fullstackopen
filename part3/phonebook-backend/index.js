const { json } = require('express');
const express = require('express'); // same as import express from 'express';
const morgan = require('morgan');
const app = express(); // executing express() 
const cors = require('cors');

app.use(cors());

let phonebook = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
]

/**
 * .use allows us to bind to middleware apps (which can be used to handle request and response objects)
  1.Execute any code.
  2.Make changes to the request and the response objects.
  3.End the request-response cycle.
  4.Call the next middleware function in the stack.
 */

app.use(express.json()); // the express.json() is a middleware 

morgan.token('postBody',(req, res) => {
  return JSON.stringify(req.body);
})

const bodyLog = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['postBody'](req, res)
  ].join(' ')
})

app.use(bodyLog);

app.get('/api/persons', (request, response) => {
    response.json(phonebook);
})

app.get('/info', (req, res) => {
    const totalPeople = phonebook.length;
    res.send(`<p>phone book has ${totalPeople} people</p>
    <p>${new Date}</p>`);
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);

    const person = phonebook.find(person => person.id === id);

    person? res.json(person): res.status(404).end();
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    phonebook = phonebook.filter(person => person.id !== id);

    res.status(204).end();
})


app.post('/api/persons', (req, res) => {
  const body = req.body;

  const person = phonebook.find(person => person.name === body.name);


  if(person !== undefined)
  {
    if(body.name === undefined || body.number === undefined)
    {
      // http 400 is bad response 
      return res.status(400).json({"name": "name is missing", "number": "number is missing"});
    }

    if(body.name.length < 0 || body.number.length < 0)
    {
      return res.status(400).json({"name": "name is missing", "number": "number is missing"});
    }
  
    if(person.name === body.name)
    {
      return res.status(400).json({"name": "name exist in the phonebook"});
    }

  }
  
  let maxID = Math.max(...phonebook.map(person => person.id));
  
  const personInfo = {
    "name": body.name,
    "number": body.number,
    "id": ++maxID
  }

  phonebook = phonebook.concat(personInfo);

  res.json(phonebook);
})

// unknown route 
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})