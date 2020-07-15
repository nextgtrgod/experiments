import draw2 from "./draw.js";
let canvas = null;
let ctx = null;
let rafId = null;
let W = 0;
let H = 0;
let dpi = 1;
let scrollTop = 0;
let timer = null;
onmessage = ({data}) => {
  let {event, options} = data;
  ({
    init: () => {
      canvas = data.canvas;
      ({
        W,
        H,
        dpi,
        scrollTop
      } = options);
      canvas.width = W;
      canvas.height = H;
      ctx = canvas.getContext("2d", {
        alpha: false,
        desynchronized: true
      });
      draw2(ctx, {
        W,
        H,
        dpi,
        scrollTop
      });
      postMessage({
        event: "ready"
      });
    },
    resize: () => {
      ({
        W,
        H,
        scrollTop
      } = options);
      canvas.width = W;
      canvas.height = H;
      if (!rafId)
        draw2(ctx, {
          W,
          H,
          dpi,
          scrollTop
        });
    },
    scroll: () => {
      scrollTop = options.scrollTop;
      if (!rafId)
        start();
      clearTimeout(timer);
      timer = setTimeout(stop, 250);
    }
  })[event]();
};
let stop = () => {
  cancelAnimationFrame(rafId);
  rafId = null;
};
let start = () => {
  stop();
  update();
};
let update = () => {
  rafId = requestAnimationFrame(() => update());
  draw2(ctx, {
    W,
    H,
    dpi,
    scrollTop
  });
};
