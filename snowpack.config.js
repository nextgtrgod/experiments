const path = require('path')

module.exports = {
	scripts: {
		'mount:*': 'mount ./src --to /',
		'build:css': 'postcss',
	},
	devOptions: {
		port: 8080,
		open: 'none',
	},
	// plugins: ['@snowpack/plugin-webpack'],
	buildOptions: {
		clean: true,
		baseUrl: process.env.NODE_ENV === 'production'
			? `/${path.basename(process.cwd())}/`
			: '/',
	},
}