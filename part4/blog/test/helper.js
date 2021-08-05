const Blog = require('../models/blog.js');
const User = require('../models/user.js');

const initialBlogs = [
  {
    title: 'Go To Canada',
    author: 'Edsger W.',
    url: 'http://www.u.arizona.edu/',
    likes: 25,
  },
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

// .find() returns a query whicch is a request for data in the database
const blogsInDb = async () => {
  const blogs = await Blog.find({}); // find all documents in blog database
  return blogs.map(blog => blog.toJSON());
}

const usersInDb = async() => {
  const users = await User.find({}) // find all documents in user database
  return users.map(user => user.toJSON()); // store user in {} to array
}


module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
}