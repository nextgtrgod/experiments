import Sketch from './modules/Sketch'

let canvas = document.getElementById('canvas')
let sketch = new Sketch({
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

let isIframe = (() => {
	try {
		return window.self !== window.top
	} catch (e) {
		return true
	}
})()

if (isIframe) {
	sketch.draw()

	let origin = import.meta.env.MODE === 'development'
		? 'http://localhost:8080'
		: 'https://nextgtrgod.github.io/experiments'

	window.addEventListener('message', e => {
		if (e.origin !== origin) return
		
		switch (e.data) {
			case 'start':
				sketch.start()
				break;
			case 'stop':
				sketch.stop()
		}
	})
} else sketch.update()
