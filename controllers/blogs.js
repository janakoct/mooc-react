const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	const result = await blog.save()
	response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
	await blog.findByIdAndRemove(request.params.id)
	return response.status(200).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const requestBody = request.body
	const blogIdToBeUpdated = request.params.id
	const updatedBlog = {}
	if (requestBody.title) {
		updatedBlog['title'] = requestBody.title
	}
	if (requestBody.url) {
		updatedBlog['url'] = requestBody.url
	}
	if (requestBody.likes) {
		updatedBlog['likes'] = requestBody.likes
	}
	const result = await blog.findByIdAndUpdate(blogIdToBeUpdated, updatedBlog, { 'new': 'true' })
	response.status(200).json(result)
})

module.exports = blogsRouter