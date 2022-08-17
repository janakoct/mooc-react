const list_helper = require('../utils/list_helper')

test('dummy returns 1', () => {
	const blogs = []
	const result = list_helper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {
	const blogs = [
		{
			'title': 'abcd',
			'author': 'janakm',
			'likes': 6
		},
		{
			'title': 'abcd',
			'author': 'janakm',
			'likes': 6
		}
	]
	test('get total likes', () => {
		const result = list_helper.totalLikes(blogs)
		expect(result).toBe(12)
	})
})

describe('get the favorite blog', () => {
	const blogs = [
		{
			'title': 'abcd',
			'author': 'janakm',
			'likes': 6
		},
		{
			'title': 'abcd',
			'author': 'janakm',
			'likes': 7
		}
	]
	test('find the favorite blog', () => {
		const result = list_helper.favoriteBlog(blogs)
		expect(result).toEqual(blogs[1])
	})
})

/* describe('get the author with the most # of blogs', () => {
	const blogs = [
		{
			'title': 'abcd',
			'author': 'janakm',
			'likes': 6
		},
		{
			'title': 'abcd',
			'author': 'janakm',
			'likes': 7
		}
	]
	test('get the author with the most # of blogs', () => {
		const result = list_helper.mostBlogsByAnAuthor(blogs)
		expect(result).toEqual(blogs[1])
	})
}) */