
let remap = (n, inMin, inMax, outMin, outMax) => (
	( (n - inMin) * (outMax - outMin) / ((inMax - inMin) || 1) + outMin )
)

module.exports = remap
