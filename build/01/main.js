import Sketch2 from "./modules/Sketch/index.js";
let canvas = document.getElementById("canvas");
let sketch = new Sketch2(canvas);
let isIframe = (() => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
})();
if (isIframe) {
  sketch.draw();
  let trusted = ["http://localhost:8080", "https://nextgtrgod.github.io"];
  window.addEventListener("message", (e) => {
    if (!trusted.includes(e.origin))
      return;
    switch (e.data) {
      case "start":
        sketch.start();
        break;
      case "stop":
        sketch.stop();
        break;
    }
  });
} else
  sketch.start();
