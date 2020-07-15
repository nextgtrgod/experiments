let gap = 0;
let dY = 0;
let draw = (ctx, {W, H, dpi, scrollTop = 0}) => {
  ctx.fillStyle = "#F0F0F0";
  ctx.fillRect(0, 0, W, H);
  gap = W / 10;
  dY = scrollTop / 4;
  ctx.strokeStyle = "rgba(0,0,0, .5)";
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    let offset = i * gap;
    let y = offset + scrollTop;
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.moveTo(offset, 0);
    ctx.lineTo(offset, H);
  }
  ctx.stroke();
  let r = (W - 900 * dpi) / 2 + 300 * dpi;
  ctx.moveTo(0, 0);
  ctx.arc(0, -1.5 * scrollTop, r, 0, 2 * Math.PI);
  ctx.fillStyle = "#FFDC4E";
  ctx.fill();
};
export default draw;
