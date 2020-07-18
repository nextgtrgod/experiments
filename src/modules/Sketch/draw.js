
let draw = (ctx, { W, H, dpi, scrollY = 0, grid, circle }) => {

	ctx.fillStyle = '#F0F0F0'
	ctx.fillRect(0, 0, W, H)

	ctx.beginPath()
	ctx.strokeStyle = 'rgba(0,0,0, .5)'

	for (let i = 0; i < grid.max; i++) {
		let offset = i * grid.cell

		// vertical
		ctx.moveTo(offset, 0)
		ctx.lineTo(offset, H)

		// horizontal
		if (i < grid.rows) {
			let y = (offset + grid.speed * scrollY) % grid.height

			ctx.moveTo(0, y)
			ctx.lineTo(W, y)
		}
	}
	ctx.stroke()

	ctx.moveTo(0, 0)
	ctx.arc(circle.x, circle.speed * scrollY, circle.r, 0, 2*Math.PI)
	ctx.fillStyle = circle.fill
	ctx.fill()
}

export default draw
