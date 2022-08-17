const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	const total = blogs.reduce((prev, current) => {
		return prev + current.likes
	}, 0)
	return total
}

const favoriteBlog = (blogs) => {
	const max = Math.max(...blogs.map(blog => blog.likes))
	const favoriteBlog = blogs.find((blog) => blog.likes === max)
	return favoriteBlog
}

const mostBlogsByAnAuthor = (blogs) => {
	let authorToBlogCount = []
	blogs.array.forEach(element => {
		if (Object.prototype.hasOwnProperty.call(element.author)) {
			authorToBlogCount[element.author] = authorToBlogCount[element.author]++
		} else {
			authorToBlogCount[element.author] = 1
		}
	})
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogsByAnAuthor
}