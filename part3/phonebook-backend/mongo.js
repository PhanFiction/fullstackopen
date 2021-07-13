const mongoose = require('mongoose');

// check if process.arv is < 3 for password
if (process.argv.length < 3)
{
    console.log('Please provide the password as an argument: in cmd put node mongo.js <password>');
    process.exit(1);
}
  
// create password
const password = process.argv[2];

// url to database
const url = `mongodb+srv://PhanFiction:${password}@cluster0.axs2h.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

// create schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

let person = null;

// create model
const Phonebook = mongoose.model('Phonebook', personSchema);

// instantiate model
if(process.argv[3] === undefined || process.argv[4] === undefined)
{
    console.log('password or username is missing');

}else{

    person = new Phonebook({
        name: process.argv[3],
        number: process.argv[4]
    });
}

Phonebook.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
});

// store to database
person.save().then(result => {
    console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
    mongoose.connection.close();
})