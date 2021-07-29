require('dotenv').config();
const express = require('express'); // same as import express from 'express';
const morgan = require('morgan');

const app = express(); // executing express()
const cors = require('cors');
const Person = require('./models/person.js');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('postBody', (req, res) => JSON.stringify(req.body));

const bodyLog = morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
  tokens.postBody(req, res),
].join(' '));

app.use(bodyLog);

app.get('/', (request, response) => {
  response.send('<p>Hello</p>');
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

app.get('/info', (request, response) => {
  Person.find({})
    .then((people) => {
      response.send(`<p>phone book has ${people.length} people</p> 
      <p>${new Date()}</p>`);
    });
});

app.get('/api/persons/:id', (request, response) => {
  // search data base by id using the method findById from mongoose
  Person.findById(request.params.id).then((personID) => {
    if (personID) {
      console.log('successful in getting id');
      response.json(personID);
    } else {
      response.status(404).end();
    }
  });
});

// route to specific id
app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;

  const personInfo = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, personInfo, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

/**
 * Add new person object to the phonebook
 */
app.post('/api/persons', (request, response, next) => {
  const { body } = request;

  if (body.name === undefined || body.number === undefined) {
    // http 400 is bad response
    return res.status(400).json({ name: 'name is missing', number: 'number is missing' });
  }

  const personInfo = new Person({
    name: body.name,
    number: body.number,
  });

  personInfo.save()
    .then((savedInfo) => savedInfo.toJSON())
    .then((savedAndFormattedPerson) => {
      response.json(savedAndFormattedPerson);
    })
    .catch((error) => next(error));
});

// unknown route
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  console.log(error.name);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
// this has to be the last loaded middleware.
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
