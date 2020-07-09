import Sketch2 from "./modules/Sketch/index.js";
let checkIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};
let canvas = document.getElementById("canvas");
window.sketch = new Sketch2(canvas);
if (!checkIframe())
  sketch.start();
else
  sketch.draw();
