
let draw = (ctx, { W, H, scrollTop = 0 }) => {

	ctx.fillStyle = '#F0F0F0'
	ctx.fillRect(0, 0, W, H)

	let gap = W / 10
	let offset = scrollTop / 4

	ctx.fillStyle = '#000'
	ctx.beginPath()

	for (let i = 0; i < 120; i++) {
		ctx.moveTo(i*gap, 0)
		ctx.lineTo(i*gap, H)

		ctx.moveTo(0, i*gap + offset)
		ctx.lineTo(W, i*gap + offset)
	}

	ctx.stroke()

	ctx.moveTo(200, 200)
	ctx.arc(0, 0 + -offset * 2, 1000, 0, 2*Math.PI)
	ctx.fillStyle = '#FFDC4E'
	ctx.fill()
}

export default draw
