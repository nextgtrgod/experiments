const path = require('path')

console.log('here', process.env.NODE_ENV)

module.exports = {
	scripts: {
		'mount:*': 'mount . --to /',
		'build:css': 'postcss',
	},
	exclude: ['/.git/'],
	devOptions: {
		port: 8080,
		open: 'none',
	},
	buildOptions: {
		clean: true,
		baseUrl: process.env.NODE_ENV === 'production'
			? `/${path.basename(process.cwd())}/`
			: '/',
	},
}