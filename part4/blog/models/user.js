const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schema defines the structure of the document, default values, validators, etc
// https://mongoosejs.com/docs/schematypes.html#objectids
// ObjectId is a unique identifier 
// Store the blogs of the ID that user posted
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Must provide a username'],
        minLength: [3, 'Must provide a minimum of 3 letters'],
        unique: true,
    },
    name: String,
    passwordHash: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [3, 'password needs to have length of 3']
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
});

userSchema.plugin(uniqueValidator);

// remove object id which is _id and turn it to id
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
});

// A model defines a programming interface for interacting with the database (read, insert, update, etc).
// User is a subclass of mongoose.model (subclass (child) - the class that inherits from another class)
// The first argument is the singular name of the collection your model is for
module.exports = mongoose.model('User', userSchema)

// below is an instance of a model called document. Models are the primary way to interact to the Db
// if we want to create an instance of an document we do the following below. 
// Instance in OOP is a way to create an obj of that type

//let person = new Users({'data': 'meh'}); //creates an instance that holds data using the User class

/**
 * To sum up what happened we first did
 * 1. Create a Schema that defines what our document will hold
 * 2. Create a Model that is a subclass which will inherit from mongoose.model (the parent)
 * 3. Create an instance that will be used to interact with the Mongoose database
 */