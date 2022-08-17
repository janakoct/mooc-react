const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogsList = [
	{
		title: 'Blog 1',
		author: 'jmehta',
		url: 'https://www.google.com',
		likes: 5
	},
	{
		title: 'Blog 2',
		author: 'rrupap',
		url: 'https://www.facebook.com',
		likes: 8
	}
]

beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjects = initialBlogsList.map(blog => {
		return new Blog(blog)
	})
	const blogPromiseArray = blogObjects.map(blogObj => {
		return blogObj.save()
	})

	await Promise.all(blogPromiseArray)
})

test('blogs returned as json', async () => {
	await api.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('ensure blog contains ID field', async () => {
	const response = await api.get('/api/blogs')
	const blogs = response.body
	blogs.forEach(element => {
		expect(element.id).toBeDefined()
	})
})

test('ensure that a post request to create a blog increments the count by 1', async () => {
	const newBlog = {
		title: 'Blog 3',
		author: 'jmehta',
		url: 'https://www.linkedin.com',
		likes: 23
	}
	await api.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	const getResponse = await api.get('/api/blogs')
	const blogs = getResponse.body
	expect(blogs).toHaveLength(initialBlogsList.length + 1)
	const blogContent = blogs.map(blog => blog.title)
	expect(blogContent).toContain(newBlog.title)
})

test('ensure that a post request to create a blog without ID or URL returns a 400 Bad Request HTTP Status', async () => {
	const newBlog = {
		author: 'jmehta',
		url: 'https://www.linkedin.com',
		likes: 23
	}
	await api.post('/api/blogs')
		.send(newBlog)
		.expect(400)
		.expect('Content-Type', /application\/json/)
	const getResponse = await api.get('/api/blogs')
	const blogs = getResponse.body
	expect(blogs).toHaveLength(initialBlogsList.length)
})

test('delete a blog entry from the database', async () => {
	const response = await api.get('/api/blogs')
	const blogId = response.body[0].id
	await api.delete(`/api/blogs/${blogId}`)
		.expect(200)
	const getResponse = await api.get('/api/blogs')
	const blogs = getResponse.body
	expect(blogs).toHaveLength(initialBlogsList.length - 1)
})

test('update an existing blog', async () => {
	const blogResponse = await api.get('/api/blogs')
	const blogToBeUpdated = blogResponse.body[0]
	const blogId = blogToBeUpdated.id
	const updatedTitle = blogToBeUpdated.title + '-updated'
	const updatedBlog = {
		title: updatedTitle
	}
	const response = await api.put(`/api/blogs/${blogId}`)
		.send(updatedBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/)
	expect(response.body.title).toEqual(updatedTitle)
})

afterAll(() => {
	mongoose.connection.close()
})