import draw from './draw'
import clamp from '../../utils/clamp'

const dpi = window.devicePixelRatio
let W = window.innerWidth * dpi
let H = window.innerHeight * dpi
let scrollY = window.scrollY * dpi

let rafId = null
let timer = null

let cell = (window.innerWidth >= 720 ? 150 : 84) * dpi
let grid = {
	cell,
	cols: Math.round(W / cell),
	rows: Math.round(H / cell),
	height: 0,
	speed: 0.25,
}

let circle = {
	x: 0,
	y: 0,
	r: 0,
	fill: '#FFDC4E',
	speed: -.75,
}

class Sketch {
	constructor(canvas) {
		this.canvas = canvas

		this.init()

		window.addEventListener('resize', () => this.resize())

		window.addEventListener('scroll', () => {
			scrollY = clamp(0, window.scrollY * dpi)

			if (this.worker) {
				this.worker.postMessage({
					event: 'scroll',
					options: { scrollY },
				})
			} else {
				if (!rafId) this.start()

				clearTimeout(timer)
				timer = setTimeout(this.stop, 250)
			}

		}, { passive: true })
	}

	init() {
		this.resize()

		if ('transferControlToOffscreen' in this.canvas) {
			this.worker = new Worker('./modules/Sketch/worker.js', { type: 'module' })

			let offscreen = this.canvas.transferControlToOffscreen()

			this.worker.postMessage({
				event: 'init',
				canvas: offscreen,
				options: { W, H, dpi, scrollY, grid, circle },
			}, [ offscreen ])

			this.worker.onmessage = ({ data }) => {
				if (data.event === 'ready') this.showCanvas()
			}

		} else {
			this.ctx = this.canvas.getContext('2d', { alpha: false })
			draw(this.ctx, { W, H, dpi, scrollY, grid, circle, easing: 1 })
			
			this.showCanvas()
		}
	}

	showCanvas() {
		this.canvas.classList.add('loaded')
	}

	resize() {
		W = window.innerWidth * dpi
		H = window.innerHeight * dpi

		grid.cols = Math.round(W / grid.cell)
		grid.rows = Math.round(H / grid.cell)
		grid.cell = Math.round(W / grid.cols)
		grid.max = Math.max(grid.cols, grid.rows)
		grid.height = grid.rows * grid.cell
	
		circle.r = Math.max(0, (W - 900 * dpi) / 2) + 300 * dpi

		if (this.worker)
			return this.worker.postMessage({
				event: 'resize',
				options: { W, H, scrollY, grid, circle }
			})

		this.canvas.width = W
		this.canvas.height = H

		if (!this.ctx) return
		if (!rafId) draw(this.ctx, { W, H, dpi, scrollY, grid, circle })
	}

	update() {
		rafId = requestAnimationFrame(() => this.update())
		draw(this.ctx, { W, H, dpi, scrollY, grid, circle })
	}

	start() {
		this.stop()
		this.update()
	}

	stop() {
		cancelAnimationFrame(rafId)
		rafId = null
	}
}

export default Sketch
