import draw2 from "./draw.js";
const dpi = window.devicePixelRatio;
let W = window.innerWidth * dpi;
let H = window.innerHeight * dpi;
let scrollTop = document.body.scrollTop * dpi / 4;
class Sketch {
  constructor(canvas) {
    this.canvas = canvas;
    this.rafId = null;
    this.init();
    let resizeTimer = null;
    window.onresize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.resize(), 150);
    };
    document.body.addEventListener("scroll", () => {
      scrollTop = document.body.scrollTop * dpi / 4;
      if (this.worker)
        this.worker.postMessage({
          event: "scroll",
          options: {
            W,
            H,
            scrollTop
          }
        });
    }, {
      passive: true
    });
  }
  init() {
    W = window.innerWidth * dpi;
    H = window.innerHeight * dpi;
    if ("transferControlToOffscreen" in this.canvas) {
      this.worker = new Worker("./modules/Sketch/worker.js", {
        type: "module"
      });
      let offscreen = this.canvas.transferControlToOffscreen();
      this.worker.postMessage({
        event: "init",
        canvas: offscreen,
        options: {
          W,
          H,
          dpi,
          scrollTop
        }
      }, [offscreen]);
      this.worker.onmessage = ({data}) => {
        if (data.event === "ready")
          this.showCanvas();
      };
    } else {
      this.canvas.width = W;
      this.canvas.height = H;
      this.ctx = this.canvas.getContext("2d", {
        alpha: false
      });
      this.start();
      this.showCanvas();
    }
  }
  showCanvas() {
    this.canvas.classList.add("loaded");
  }
  resize() {
    W = window.innerWidth * dpi;
    H = window.innerHeight * dpi;
    if (this.worker)
      return this.worker.postMessage({
        event: "resize",
        options: {
          W,
          H,
          scrollTop
        }
      });
    this.canvas.width = W;
    this.canvas.height = H;
  }
  update() {
    this.radId = requestAnimationFrame(() => this.update());
    draw2(this.ctx, {
      W,
      H,
      dpi,
      scrollTop
    });
  }
  start() {
    this.update();
  }
  stop() {
    cancelAnimationFrame(this.rafId);
  }
}
export default Sketch;
