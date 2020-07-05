import {create, draw as draw2} from "./draw.js";
self.radId = null;
self.canvas = null;
onmessage = (e) => {
  let {canvas, options} = e.data;
  if (canvas)
    self.canvas = canvas;
  self.canvas.width = options.W;
  self.canvas.height = options.H;
  let ctx = self.canvas.getContext("2d", {
    alpha: false,
    desynchronized: true
  });
  cancelAnimationFrame(self.radId);
  create(options);
  self.rafId = self.update(ctx, options);
};
self.update = (...args) => {
  self.radId = requestAnimationFrame(() => update(...args));
  draw2(...args);
};
