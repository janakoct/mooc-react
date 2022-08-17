const errorHandler = (error, request, response, next) => {
	console.log(error.errors)
	if (error.name === 'ValidationError') {
		return response.status(400).send({ 'error': error.errors })
	}
	next(error)
}
module.exports = errorHandler