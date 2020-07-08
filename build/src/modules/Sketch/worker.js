import draw2 from "./draw.js";
let canvas = null;
let ctx = null;
let rafId = null;
let W = 0;
let H = 0;
let scrollTop = 0;
onmessage = ({data}) => {
  let {event, options} = data;
  ({
    init: () => {
      canvas = data.canvas;
      ({
        W,
        H,
        scrollTop
      } = options);
      canvas.width = W;
      canvas.height = H;
      ctx = canvas.getContext("2d", {
        alpha: false,
        desynchronized: true
      });
      start();
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
    },
    scroll: () => {
      scrollTop = options.scrollTop;
    }
  })[event]();
};
let stop = () => {
  cancelAnimationFrame(rafId);
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
    scrollTop
  });
};
