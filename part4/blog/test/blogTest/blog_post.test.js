const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const api = supertest(app);
const helper = require('../helper');
const Blog = require('../../models/blog');
const User = require('../../models/user');

// main cause of jest not closing or over run time is not using helper.blogsInDb(); 
// using helper.initialBlogs cause a long loading time

// connect to database before testing
beforeAll(async () => {

    await User.deleteMany({})
    const user = {
      username: 'test',
      name: 'test dummy',
      password: 'password'
    }
  
    await api
      .post('/api/users')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
  })

// delete database at the beginning and create a model before every test
beforeEach(async () => {
    await Blog.deleteMany({}); // deletes all the documents 
    await Blog.insertMany(helper.initialBlogs); // inserts the document we want to test
})

describe('new blog', () => {

    test('post a blog to the database', async ()=> {

        const loginUser = {
            username: 'test',
            password: 'password'
        }

        const loggedUser = await api
            .post('/api/login')
            .send(loginUser)
            .expect('Content-Type', /application\/json/)


        const newBlog = {
            title: 'Test an app',
            author: 'Johnny Dep',
            url: 'https://steam.com/',
            likes: 55
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .set('Authorization', `bearer ${loggedUser.body.token}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)
    

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    
        const title = await blogsAtEnd.map(title => title.title);
        expect(title).toContain('Test an app');
    })

    test('verify if likes is missing', async ()=> {

        const loginUser = {
            username: 'test',
            password: 'password'
        }

        const loggedUser = await api
            .post('/api/login')
            .send(loginUser)
            .expect('Content-Type', /application\/json/)

        
        const newBlog = {        
            title: 'Reacts',
            author: 'Michael Willow',
            url: 'https://react.com', 
        }
    
        const response = await api 
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${loggedUser.body.token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        expect(response.body.likes).toBeDefined();
        expect(response.body.likes).toBe(0);
    })

    test('blog with missing url', async ()=> {

        const loginUser = {
            username: 'test',
            password: 'password'
        }

        const loggedUser = await api
            .post('/api/login')
            .send(loginUser)
            .expect('Content-Type', /application\/json/)


        const newBlog = {
            title: 'Reacts',
            author: 'John Willow',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${loggedUser.body.token}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('update blog', async ()=> {
        const blogAtStart = await helper.blogsInDb();
        const blogId = blogAtStart[1].id;

        const updatedInfo = {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 24,
        }

        await api
            .put(`/api/blogs/${blogId}`)
            .send(updatedInfo)
            .expect(200);

        const blogAtEnd = await helper.blogsInDb();

        expect(blogAtEnd[1].likes).toBe(24);
    })

    test('get blog user', async() => {

        const blogAtStart = await helper.blogsInDb();
        const blogId = blogAtStart[0];

        await api
            .get(`/api/blogs/${blogId.id}`)
            .expect(200)
    })
})


describe('delete blog', () => {

    test('deletes a blog in the database', async () => {

        const blogAtStart = await helper.blogsInDb(); // get blogs from the database that will contain the ID

        const deleteBlog = blogAtStart[0];

        await api
            .delete(`/api/blogs/${deleteBlog.id}`)
            .expect(204)

        const blogAfterMath =  await helper.blogsInDb();
        expect(blogAfterMath).toHaveLength(helper.initialBlogs.length-1);
    })
})

afterAll(()=> {
    mongoose.connection.close();
})