const mongoose = require('mongoose')

require('dotenv').config()

const url = process.env.MONGO_URI

mongoose.connect(url)
	.then(() => {
		console.log('Connected')
	})
	.catch(err => {
		console.log('Failed to connect', err)
	})

const phonebookSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: String
})

phonebookSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', phonebookSchema)