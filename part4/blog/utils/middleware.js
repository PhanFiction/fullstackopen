const logger = require('./logger.js');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next()
}


const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


// extracts the token from the user when they login
const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  request.token = getTokenFrom(request);
  next()
}

// verify is user has token
const userExtractor = async (request, response, next) => {
  const token = getTokenFrom(request);
  //console.log('token ', token);
  if(token !== null){
    const decodedToken = jwt.verify(token, process.env.SECRET);
    request.user = await User.findById(decodedToken.id);
  }
  next();
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId')
  {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError') 
  {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'JsonWebTokenError') 
  {
    return response.status(401).json({
      error: 'invalid token'
    })
  }
  else if (error.name === 'TokenExpiredError') 
  {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}