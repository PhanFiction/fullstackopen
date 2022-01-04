const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');
const jwt = require('jsonwebtoken');

// fetch items from the home page
blogsRouter.get('/', (request, response) => {
  Blog
    .find({}).populate('user', {username: 1, user: 1})
    .then(blogs => {
      response.json(blogs)
    })
})

// display the info of a single id blog
blogsRouter.get('/:id', async (request, response) => {
  blog = await Blog.findById(request.params.id);

  if(blog)
  {
    response.json(blog);
  }else{
    response.status(404).end();
  }
})


// request to post an item
blogsRouter.post('/', async (request, response) => {
  //const blog = new Blog(request.body);
  const body = request.body;
  const token =  request.token;

/*   const decodedToken = jwt.verify(token, process.env.SECRET);


  if (!token || !decodedToken.id) 
  {
    return response.status(401).send({ error: 'token missing or invalid' })
  } */

  // get user
  const user = request.user;
  //const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if(body.title == undefined || body.url == undefined)
  {
    return response.status(400).send({error: "title or url is missing"});
  }

  // save blog to create blog id
  const savedBlog = await blog.save();

  // access User.blogs and save the blog id
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog);
})


// delete an object from the database
// get id parameter from the route
blogsRouter.delete('/:id', async (request, response) => {

  // get token from the parameter from the route 
  const id = await request.params.id; // get id of blog from parameter
  const blog = await Blog.findById(id); // find blog by the id

  // fetch token of user when they login
  const token = await request.token;

  // verify token
  const decryptedToken = jwt.verify(token, process.env.SECRET);

  // send 401 (unauthorized) if token or decrypted token is not valid
  if(!token && !decryptedToken)
  {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  // compare blog user id owner with decrypted user id
  if(blog.user.toString() === decryptedToken.id)
  {
    // delete blog if match
    await Blog.findByIdAndRemove(id)
    response.status(204).end();
  }else{
    return response.status(401).toJSON({error: "Unauthorized to delete this blog"});
  }
  
  //response.status(204).end(); // return http and end response
})


// updates the likes 
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    likes: body.likes
  }

  //added the optional { new: true } parameter, which will cause our event handler to be called with the new modified document instead of the original.
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});

  // the result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object
  response.json(updatedBlog); 
})

module.exports = blogsRouter;