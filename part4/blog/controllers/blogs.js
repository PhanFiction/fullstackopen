const blogsRouter = require('express').Router();
const Blog = require('../model/blog.js');


// fetch items from the home page
blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
});


// request to post an item
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);
  const body = request.body;

  if(body.title == undefined || body.url == undefined)
  {
    return response.status(400).send({error: "title or url is missing"});
  }

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    })
});


// delete an object from the database
// get id parameter from the route
blogsRouter.delete('/:id', async (request, response) => {
  const id = await request.params.id; // get id from parameter
  await Blog.findByIdAndRemove(id);
  response.status(204).end(); // return http and end response
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