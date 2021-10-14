import draw from './draw'
import OffscreenWorker from './worker?worker'

let dpr = window.devicePixelRatio
let W = window.innerWidth
let H = window.innerHeight
let scrollY = window.scrollY

let rafId = 0
let timer = 0

let cell = (window.innerWidth >= 720) ? 150 : 84
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

		window.addEventListener('resize', () => this.setSize())

		window.addEventListener('scroll', () => {
			scrollY = Math.max(0, window.scrollY)

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
		this.setSize()

		if ('transferControlToOffscreen' in this.canvas) {
			this.worker = new OffscreenWorker()

			let offscreen = this.canvas.transferControlToOffscreen()

			this.worker.onmessage = ({ data }) => {
				if (data.event === 'ready') this.showCanvas()
			}

			this.worker.postMessage({
				event: 'init',
				canvas: offscreen,
				options: { W, H, dpr, scrollY, grid, circle },
			}, [ offscreen ])

		} else {
			this.ctx = this.canvas.getContext('2d', { alpha: false })
			this.ctx.scale(dpr, dpr)

			draw(this.ctx, { W, H, dpr, scrollY, grid, circle, easing: 1 })
			
			this.showCanvas()
		}
	}

	showCanvas() {
		this.canvas.classList.add('loaded')
	}

	setSize() {
		dpr = window.devicePixelRatio
		W = window.innerWidth
		H = window.innerHeight

		grid.cell = (W >= 720) ? 150 : 84
		grid.cols = Math.round(W / grid.cell)
		grid.rows = Math.round(H / grid.cell) + 1
		// re-caclulate cell size to fit grid
		grid.cell = Math.round(W / grid.cols)
		grid.max = Math.max(grid.cols, grid.rows)
		grid.height = grid.rows * grid.cell
	
		circle.r = Math.max(0, (W - 900) / 2) + 300

		if (this.worker)
			return this.worker.postMessage({
				event: 'resize',
				options: { W, H, dpr, scrollY, grid, circle }
			})

		this.canvas.width = W * dpr
		this.canvas.height = H * dpr
		
		if (!this.ctx) return

		this.ctx.scale(dpr, dpr)
		if (!rafId) draw(this.ctx, { W, H, dpr, scrollY, grid, circle })
	}

	update() {
		rafId = requestAnimationFrame(() => this.update())
		draw(this.ctx, { W, H, dpr, scrollY, grid, circle })
	}

	start() {
		this.stop()
		this.update()
	}

	stop() {
		cancelAnimationFrame(rafId)
		rafId = 0
	}
}

export default Sketch
