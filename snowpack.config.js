module.exports = {
	scripts: {
		'mount:*': 'mount . --to /',
		'build:css': 'postcss',
	},
	devOptions: {
		port: 8080,
		open: 'none',
	},
	buildOptions: {
		clean: true,
	},
}