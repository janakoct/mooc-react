const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const errorHandler = require('./middleware/errorhandler')

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch(err => {
		console.error('Error while connecting to MongoDB', err)
	})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(errorHandler)

module.exports = app