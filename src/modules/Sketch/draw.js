
let scrollPos = 0

let draw = (ctx, { W, H, dpr, scrollY = 0, grid, circle, easing = .25 }) => {

	ctx.lineWidth = 1 / dpr
	ctx.fillStyle = '#F0F0F0'
	ctx.fillRect(0, 0, W, H)

	scrollPos += (scrollY - scrollPos) * easing

	ctx.beginPath()
	ctx.strokeStyle = 'rgba(0,0,0, .125)'

	for (let i = 0; i < grid.max; i++) {
		let offset = i * grid.cell

		// vertical
		ctx.moveTo(offset, 0)
		ctx.lineTo(offset, H)

		// horizontal
		if (i < grid.rows) {
			let y = (offset + grid.speed * scrollPos) % grid.height

			ctx.moveTo(0, y)
			ctx.lineTo(W, y)
		}
	}
	ctx.stroke()

	ctx.moveTo(0, 0)
	ctx.arc(circle.x, circle.speed * scrollPos, circle.r, 0, 2*Math.PI)
	ctx.fillStyle = circle.fill
	ctx.fill()
}

export default draw
