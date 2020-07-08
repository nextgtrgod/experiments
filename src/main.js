import VanillaTilt from 'vanilla-tilt'
import Sketch from './modules/Sketch'

let frames = [...document.getElementsByTagName('iframe')]

frames.forEach(frame => {
	frame.addEventListener('load', () => {
		frame.classList.add('loaded')

		frame.parentNode.addEventListener('mouseenter', () => {

			frame.contentWindow.sketch.start()
		})

		frame.parentNode.addEventListener('mouseleave', () => {
			frame.contentWindow.sketch.stop()
		})
	})
})


let links = [...document.getElementsByClassName('experiment')]

links.forEach(el => {
	VanillaTilt.init(el, {
		reverse: false,
		max: 5,
		speed: 600,
		// glare: true,
		// 'max-glare': .25,
		gyroscope: false,
	})
})

let canvas = document.getElementById('bg')
let sketch = new Sketch(canvas)

