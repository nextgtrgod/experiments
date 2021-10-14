import VanillaTilt from 'vanilla-tilt'
import Sketch from './modules/Sketch'

const hasHover = window.matchMedia('(hover)').matches
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const animate = hasHover && !reducedMotion

let frames = [...document.getElementsByTagName('iframe')]

frames.forEach(frame => {
	frame.addEventListener('load', () => {
		frame.classList.add('loaded')

		if (!animate) return

		frame.parentNode.addEventListener('mouseenter', () => {
			frame.contentWindow.postMessage('start', '*')
		})

		frame.parentNode.addEventListener('mouseleave', () => {
			frame.contentWindow.postMessage('stop', '*')
		})

		// frame.parentNode.addEventListener('mousemove', (e) => {
		// 	console.log(e)
		// })
	})
})

// tilt effect
if (animate) {
	let links = [...document.getElementsByClassName('experiment')]
	
	links.forEach(el => {
		VanillaTilt.init(el, {
			reverse: false,
			max: 5,
			speed: 600,
			gyroscope: false,
		})
	})
}

let canvas = document.getElementById('bg')
let sketch = new Sketch(canvas)
