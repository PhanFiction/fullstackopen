const config = require('./utils/config');
const express = require('express');
const cors = require('cors');
const app = express();
const blogsRouter = require('./controllers/blogs.js');
const usersRouter = require('./controllers/users.js');
const loginRouter = require('./controllers/login.js');
const testRouter = require('./controllers/test.js');
const middleware = require('./utils/middleware.js');
const logger = require('./utils/logger.js');
const mongoose = require('mongoose');


mongoose.connect(config.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true 
})
.then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors());
app.use(express.json()); // middleware that parses incoming request body in json format
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
//app.use(middleware.userExtractor);

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', middleware.userExtractor, blogsRouter); // route to blogs

if (process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/test')
  app.use('/api/testing', testRouter)
}
// middleware of unknown enpoint of error
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;