import Sketch from './modules/Sketch'

let canvas = document.getElementById('canvas')
let options = (new URL(document.location)).searchParams
let dpi = parseInt(options.get('dpi')) || window.devicePixelRatio
let antialias = options.get('antialias') === 'false' ? false : true

let sketch = new Sketch({
	node: canvas,
	dpi,
	antialias,
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

	let trusted = [
		'http://localhost:8080',
		'https://nextgtrgod.github.io',
	]

	window.addEventListener('message', e => {
		if (!trusted.includes(e.origin)) return
		
		switch (e.data) {
			case 'start':
				sketch.start()
				break;
			case 'stop':
				sketch.stop()
				break;
		}
	})
} else sketch.start()
