let dY = 0;
let speed = 0.25;
let draw = (ctx, {W, H, dpi, grid, scrollY = 0}) => {
  ctx.fillStyle = "#F0F0F0";
  ctx.fillRect(0, 0, W, H);
  dY = scrollY * speed;
  ctx.beginPath();
  ctx.strokeStyle = "rgba(0,0,0, .5)";
  for (let i = 0; i < grid.max; i++) {
    let offset = i * grid.cell;
    ctx.moveTo(offset, 0);
    ctx.lineTo(offset, H);
    let y = offset + scrollY;
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
  }
  ctx.stroke();
  let r = (W - 900 * dpi) / 2 + 300 * dpi;
  ctx.moveTo(0, 0);
  ctx.arc(0, -1.5 * scrollY, r, 0, 2 * Math.PI);
  ctx.fillStyle = "#FFDC4E";
  ctx.fill();
};
export default draw;
