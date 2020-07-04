
let random = {
	rnd: Math.random,

	from: function (arr) {
		return arr[ ~~(this.rnd() * arr.length) ]
	},

	range: function (min = 0, max = 1) {
		return this.rnd() * (max - min) + min
	},

	seed: function (seed) {
		this.rnd = () => {
			let x = Math.sin(seed++) * 10000
			return x - Math.floor(x)
		}

		return this
	},
}

export default random
