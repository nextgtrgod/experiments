import VanillaTilt from 'vanilla-tilt'
import Sketch from './modules/Sketch'

const hasHover = window.matchMedia('(hover)').matches
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const animate = hasHover && !reducedMotion

const frames = [...document.getElementsByTagName('iframe')]

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
	})
})

// tilt effect
if (animate) {
	const links = [...document.getElementsByClassName('experiment')]

	links.forEach(el => {
		VanillaTilt.init(el, {
			reverse: false,
			max: 5,
			speed: 600,
			gyroscope: false,
		})
	})
}

const canvas = document.getElementById('bg')
const sketch = new Sketch(canvas)
