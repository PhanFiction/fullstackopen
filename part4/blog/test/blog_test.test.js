const mongoose = require('mongoose');
const app = require('../app');
const helper = require('../test/test_helper');
const supertest = require('supertest');
const api = supertest(app);

test('returns the correct amount of blog posts in JSON format', async ()=>{
    await
        api
        .get('/api/blogs')
        .expect(200)
        .expect('content-type', /application\/json/)
})

test('returns the id as id and not _id', async ()=> {
    const singleBlog = await helper.blogsInDb();

    expect(singleBlog[0].id).toBeDefined();
})

afterAll(async ()=>{
    await mongoose.connection.close()
})