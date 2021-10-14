import draw from './draw'

let W = 0
let H = 0
let dpr = 1
let scrollY = 0

let canvas = null
let ctx = null

let rafId = 0
let timer = 0

let grid = null
let circle = null

let setSize = () => {
	canvas.width = W * dpr
	canvas.height = H * dpr
	if (ctx) ctx.scale(dpr, dpr)
}

onmessage = ({ data }) => {
	let { event, options } = data;

	({
		'init': () => {
			canvas = data.canvas;

			({ W, H, dpr, scrollY, grid, circle } = options)

			ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })

			setSize()

			draw(ctx, { W, H, dpr, scrollY, grid, circle, easing: 1 })

			postMessage({ event: 'ready' })
		},

		'resize': () => {
			({ W, H, dpr, scrollY, grid, circle } = options)

			setSize()

			if (!rafId) draw(ctx, { W, H, dpr, scrollY, grid, circle })
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
	rafId = 0
}

let start = () => {
	stop()
	update()
}

let update = () => {
	rafId = requestAnimationFrame(() => update())
	draw(ctx, { W, H, dpr, scrollY, grid, circle })
}
