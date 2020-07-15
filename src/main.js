import VanillaTilt from 'vanilla-tilt'
import Sketch from './modules/Sketch'

const hover = window.matchMedia('(hover)').matches

let frames = [...document.getElementsByTagName('iframe')]

frames.forEach(frame => {
	frame.addEventListener('load', () => {
		frame.classList.add('loaded')

		if (!hover) return

		frame.parentNode.addEventListener('mouseenter', () => {
			frame.contentWindow.postMessage('start')
		})

		frame.parentNode.addEventListener('mouseleave', () => {
			frame.contentWindow.postMessage('stop')
		})
	})
})

// tilt effect
if (hover) {
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
}

let canvas = document.getElementById('bg')
let sketch = new Sketch(canvas)
