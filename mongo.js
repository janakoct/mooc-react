const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide the password for the mongodb database')
	process.exit(1)
}

const password = process.argv[2]
console.log(password)
const url = `mongodb://testuser:${password}@ac-bcnnezo-shard-00-00.4jsxm2k.mongodb.net:27017,ac-bcnnezo-shard-00-01.4jsxm2k.mongodb.net:27017,ac-bcnnezo-shard-00-02.4jsxm2k.mongodb.net:27017/?ssl=true&replicaSet=atlas-lkmwpo-shard-0&authSource=admin&retryWrites=true&w=majority`

const phonebookSchema = new mongoose.Schema({
	name: String,
	number: String
})

const phonebookEntry = mongoose.model('Person', phonebookSchema)

if (process.argv.length === 3) {
	console.log('This is a get call')
	mongoose
		.connect(url)
		.then(() => {
			phonebookEntry.find({})
				.then((persons) => {
					persons.forEach(person => {
						console.log(`Name: ${person.name}, number: ${person.number}`)
					})
					mongoose.connection.close()
				})
		})
} else if (process.argv.length > 5) {
	console.log('Extra parameters detected. Please run the program as node mongo.js <db_password> "Person_Name" "Person_Number"')
} else {
	console.log('This is an insert operation')
	mongoose
		.connect(url)
		.then(() => {
			const person = new phonebookEntry({
				name: process.argv[3],
				number: process.argv[4]
			})
			return person.save()
		})
		.then(() => {
			console.log('Person saved')
			return mongoose.connection.close()
		})
		.catch((err) => {
			console.log(err)
		})
}