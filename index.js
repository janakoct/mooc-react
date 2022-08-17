require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Phonebook = require('./models/phonebook')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', (req) => {return JSON.stringify(req.body)})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
	skip: function(req) {return req.method !== 'POST'}
}))

let persons = [
	{
		'id': 1,
		'name': 'Arto Hellas',
		'number': '040-123456'
	},
	{
		'id': 2,
		'name': 'Ada Lovelace',
		'number': '39-44-5323523'
	},
	{
		'id': 3,
		'name': 'Dan Abramov',
		'number': '12-43-234345'
	},
	{
		'id': 4,
		'name': 'Mary Poppendieck',
		'number': '39-23-6423122'
	}
]

app.get('/api/persons', (request, response) => {
	Phonebook.find({})
		.then(result => {
			response.json(result)
		})
})

app.get('/api/persons/:id', (request, response, next) => {
	let personid = Number(request.params.id)
	Phonebook.findById(personid)
		.then(result => {
			if (result) {
				response.json(result)
			} else {
				response.status(404).end()
			}
		})
		.catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
	let personid = Number(request.params.id)
	Phonebook.findByIdAndRemove(personid)
		.then(() => response.status(204).end())
		.catch(err => next(err))
})

app.post('/api/persons', (request, response, next) => {
	const person = request.body
	if (!person.name) {
		return response.status(400).json({
			'error': 'Person name is mandatory'
		})
	}

	if (!person.number) {
		return response.status(400).json({
			'error': 'Person number is mandatory'
		})
	}

	const personEntry = new Phonebook({
		name: person.name,
		number: person.number
	})

	personEntry.save().then(savedPerson => {
		response.json(savedPerson)
	}).catch(err => next(err))
})

app.get('/info', (request, response) => {
	let count = persons.length
	let now = new Date()
	response.send(`<p>Phonebook has info for ${count} people</p> <br/> ${now}`)
})

const errorHandler = (error, request, response, next) => {
	console.error(error)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).send({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})