module.exports = {
	scripts: {
		'run:css': 'postcss',
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