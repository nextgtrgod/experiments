import draw from './draw'

const dpi = window.devicePixelRatio
let W = window.innerWidth * dpi
let H = window.innerHeight * dpi
let scrollTop = document.body.scrollTop

class Sketch {
	constructor(canvas) {
		this.canvas = canvas
		this.rafId = null

		this.init()

		let resizeTimer = null

		window.onresize = () => {
			clearTimeout(resizeTimer)
			resizeTimer = setTimeout(() => this.resize(), 150)
		}

		document.body.addEventListener('scroll', () => {
			scrollTop = document.body.scrollTop

			if (this.worker)
				this.worker.postMessage({
					event: 'scroll',
					options: { W, H, scrollTop },
				})

		}, { passive: true })
	}

	init() {
		W = window.innerWidth * dpi
		H = window.innerHeight * dpi

		let options = { W, H, scrollTop }

		if ('transferControlToOffscreen' in this.canvas) {
			this.worker = new Worker('./src/modules/Sketch/worker.js', { type: 'module' })

			let offscreen = this.canvas.transferControlToOffscreen()

			this.worker.postMessage({
				event: 'init',
				canvas: offscreen,
				options,
			}, [ offscreen ])

		} else {
			this.canvas.width = W
			this.canvas.height = H

			cancelAnimationFrame(this.radId)

			let ctx = this.canvas.getContext('2d', { alpha: false })
			this.update(ctx, options)
		}
	}

	resize() {
		W = window.innerWidth * dpi
		H = window.innerHeight * dpi

		if (this.worker)
			return this.worker.postMessage({
				event: 'resize',
				options: { W, H, scrollTop }
			})

		this.canvas.width = W
		this.canvas.height = H
	}

	update(...args) {
		this.radId = requestAnimationFrame(() => this.update(...args))
		draw(...args)
	}

	start() {
		this.update()
	}

	stop() {
		cancelAnimationFrame(this.rafId)
	}
}

export default Sketch
