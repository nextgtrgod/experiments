
let draw = (ctx, { W, H, scrollTop = 0 }) => {

	ctx.fillStyle = '#F0F0F0'
	ctx.fillRect(0, 0, W, H)

	let gap = W / 10
	let dY = scrollTop / 4

	ctx.fillStyle = '#000'
	ctx.beginPath()

	for (let i = 0; i < 10; i++) {
		// horizontal
		let offset = i*gap
		let y = offset + dY

		ctx.moveTo(0, y)
		ctx.lineTo(W, y)

		// vertical
		ctx.moveTo(offset, 0)
		ctx.lineTo(offset, H)
	}

	ctx.stroke()

	let dpi = 2
	let r = (W - 900 * dpi) / 2 + 300 * dpi

	ctx.moveTo(0, 0)
	ctx.arc(0, -2*dY, r, 0, 2*Math.PI)
	ctx.fillStyle = '#FFDC4E'
	ctx.fill()
}

export default draw
