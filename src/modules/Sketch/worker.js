import draw from './draw'

let canvas = null
let ctx = null
let rafId = null

let W = 0
let H = 0
let dpi = 1
let scrollY = 0
let timer = null

let grid = null
let circle = null

let resize = () => {
	canvas.width = W
	canvas.height = H
}

onmessage = ({ data }) => {
	let { event, options } = data;

	({
		'init': () => {
			canvas = data.canvas;

			({ W, H, dpi, scrollY, grid, circle }) = options

			resize()
		
			ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })
			draw(ctx, { W, H, dpi, scrollY, grid, circle, easing: 1 })

			postMessage({ event: 'ready' })
		},

		'resize': () => {
			({ W, H, scrollY, grid, circle }) = options

			resize()

			if (!rafId) draw(ctx, { W, H, dpi, scrollY, grid, circle })
		},

		'scroll': () => {
			scrollY = options.scrollY

			if (!rafId) start()

			clearTimeout(timer)
			timer = setTimeout(stop, 250)
		},
	})[event]()
}

let stop = () => {
	cancelAnimationFrame(rafId)
	rafId = null
}

let start = () => {
	stop()
	update()
}

let update = () => {
	rafId = requestAnimationFrame(() => update())
	draw(ctx, { W, H, dpi, scrollY, grid, circle })
}
