import Sketch3D from './modules/Sketch3D'

let sketch3D = new Sketch3D({
	node: document.getElementById('canvas'),
	height: {
		0: 420,
		720: 560,
		960: 820,
	},
	// dpi: 1,
	antialias: true,
	tryWebGL2: true,
})
