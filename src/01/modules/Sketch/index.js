import rnd from '../../utils/random'
import Dot from './Dot'

class Sketch {
	constructor(canvas) {
		this.canvas = canvas
		this.dpi = window.devicePixelRatio

		this.init()

		let resizeTimer = null

		window.onresize = () => {
			clearTimeout(resizeTimer)
			resizeTimer = setTimeout(() => this.init(), 150)
		}
	}

	init() {
		this.W = window.innerWidth * this.dpi
		this.H = window.innerHeight * this.dpi

		this.canvas.width = this.W
		this.canvas.height = this.H

		cancelAnimationFrame(this.radId)

		this.ctx = this.canvas.getContext('2d', { alpha: false })

		this.createDots()
	}

	createDots() {
		this.dots = []

		let count = 16
		let speed = 2
		this.threshold = this.W / 3

		const PI = Math.PI

		let scale = window.innerWidth >= 600 ? 2 : 1
	
		for (let i = 0; i < count; i++) {
	
			let s = rnd.range(.5, speed) * this.dpi
	
			let limit = PI/12
			let angle = rnd.from([
				rnd.range(limit, PI/2 - limit),
				rnd.range(PI/2 + limit, PI - limit),
				rnd.range(PI + limit, 1.5*PI - limit),
				rnd.range(1.5*PI + limit, 2*PI - limit),
			])
	
			this.dots.push(
				new Dot({
					id: i,
					x: rnd.range(0, this.W),
					y: rnd.range(0, this.H),
					r: rnd.range(3, 5) * scale * this.dpi,
					v: {
						x: s * Math.cos(angle),
						y: s * Math.sin(angle),
					},
				})
			)
		}
	}

	draw() {
		// clear canvas
		this.ctx.fillStyle = '#000'
		this.ctx.fillRect(0, 0, this.W, this.H)
	
		for (let i = 0; i < this.dots.length; i++) {
	
			this.dots[i].update(this.ctx, this.W, this.H, this.dots, this.threshold)
	
			for (let id in this.dots[i].lines) {
				this.ctx.beginPath()
				this.ctx.moveTo(this.dots[i].lines[id][0].x, this.dots[i].lines[id][0].y)
				this.ctx.lineTo(this.dots[i].lines[id][1].x, this.dots[i].lines[id][1].y)
	
				this.ctx.strokeStyle = `rgba(240, 240, 240, ${this.dots[i].lines[id].alpha})`
				this.ctx.lineWidth = this.dots[i].lines[id].width
				this.ctx.stroke()
			}
		}
	}

	update() {
		this.radId = requestAnimationFrame(() => this.update())
		this.draw()
	}

	start() {
		this.update()
	}

	stop() {
		cancelAnimationFrame(this.radId)
	}
}

export default Sketch
