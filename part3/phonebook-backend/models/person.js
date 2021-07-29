const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

// create schema
const personSchema = mongoose.Schema({
  name: { type: String, minLength: [3, 'name should have 3 characters'], required: true },
  number: { type: String, minLength: [8, 'number should 8 digits'], requird: true },
});

// remove __v and _id and replace it with id
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

personSchema.plugin(validator);
module.exports = mongoose.model('Phonebook', personSchema);
