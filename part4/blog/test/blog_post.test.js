const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('../test/test_helper');
const Blog = require('../model/blog');


// delete database at the beginning
beforeEach(async () => {
    await Blog.deleteMany({}); // deletes all the documents 
    await Blog.insertMany(helper.initialBlogs); // inserts the document we want to test
});

describe('verifies post blog', () => {

    test('post a blog to the database', async ()=> {
        const blog = await helper.blogsInDb();
    
        // you want to post it to the end point location from the router
        // then send data you want to be in the database
        // but also not save it
        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const singleBlog = await helper.blogsInDb();
        expect(singleBlog).toHaveLength(helper.initialBlogs.length + 1);
    
        const title = singleBlog.map(title => title.title);
        expect(title).toContain('React patterns');
    })
    
    test('verify if likes is missing', async ()=> {
        const newBlog = {        
            title: 'Reacts',
            author: 'Michael Willow',
            url: 'https://react.com', 
        }
    
        const response = await api 
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        expect(response.body.likes).toBeDefined();
        expect(response.body.likes).toBe(0);
    })

    test('blog with missing url', async ()=> {
        const newBlog = {
            title: 'Reacts',
            author: 'John Willow',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('update the blogs like', async ()=> {
        const blogs = await helper.blogsInDb();
        const updateLikes = blogs[0];

        await api
            .put(`/api/blogs/${updateLikes.id}`)
            .expect(200)
        
        const blogAfter = await helper.blogsInDb();
        expect(blogAfter[0].likes).toBe()
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