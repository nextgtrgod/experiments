import draw from './draw'

let canvas = null
let ctx = null
let rafId = null

let W = 0
let H = 0
let dpi = 1

let grid = {
	cell: 120,
	cols: Math.round(W / 120),
	rows: Math.round(H / 120),
}

let scrollY = 0
let timer = null

let resize = () => {
	canvas.width = W
	canvas.height = H

	grid.cols = Math.round(W / grid.cell)
	grid.rows = Math.round(H / grid.cell)
	grid.cell = Math.round(W / grid.cols)
	grid.max = Math.max(grid.cols, grid.rows)
}

onmessage = ({ data }) => {
	let { event, options } = data;

	({
		'init': () => {
			canvas = data.canvas;

			({ W, H, dpi, scrollY }) = options

			grid.cell *= dpi

			resize()
		
			ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })
			draw(ctx, { W, H, dpi, scrollY, grid })

			postMessage({ event: 'ready' })
		},

		'resize': () => {
			({ W, H, scrollY }) = options

			resize()

			if (!rafId) draw(ctx, { W, H, dpi, grid, scrollY })
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
	draw(ctx, { W, H, dpi, grid, scrollY })
}
