import Sketch3D from './modules/Sketch3D'

let checkIframe = () => {
	try {
		return window.self !== window.top
	} catch (e) {
		return true
	}
}

let canvas = document.getElementById('canvas')
window.sketch = new Sketch3D({
	node: canvas,
	height: {
		0: 420,
		720: 560,
		960: 820,
	},
	// dpi: 1,
	antialias: true,
	tryWebGL2: true,
})

if (!checkIframe()) sketch.start()
else sketch.draw()
