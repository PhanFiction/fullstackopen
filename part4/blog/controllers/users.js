const bcrypt = require('bcrypt');
const userRouter = require('express').Router(); // no need to define longer path to endpoint
const User = require('../models/user.js'); // used to create Schema

// For client wanting to create an account
userRouter.post('/', async(request, response) => {
    const body = request.body;

    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser);
});


// fetch all the users document from the database
userRouter.get('/', async(request, response) => {
    // in SQL, we can use the join query to join content from other collections in the database
    // in mongoose its not possible but instead we can use the .populate() method that can reference other documents in other collections
    const users = await User.find({}).populate('user', {username: 1, user: 1}); // return to us the users and the blogs they posted by getting the user id in the blogs

    // if we want we can also make selection of what we want to fetch from the database
    // return users with blogs but the object holds only {title and likes}
    //const users2 = User.find({}).populate('blogs', {title: 1, likes: 1});
    response.json(users);
});

module.exports = userRouter;