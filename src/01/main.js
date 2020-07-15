import Sketch from './modules/Sketch'

let checkIframe = () => {
	try {
		return window.self !== window.top
	} catch (e) {
		return true
	}
}

let canvas = document.getElementById('canvas')
window.sketch = new Sketch(canvas)

if (!checkIframe()) sketch.start()
else sketch.draw()
