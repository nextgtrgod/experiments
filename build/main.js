import VanillaTilt from "/experiments/web_modules/vanilla-tilt.js";
import Sketch2 from "./modules/Sketch/index.js";
const hover = window.matchMedia("(hover)").matches;
let frames = [...document.getElementsByTagName("iframe")];
frames.forEach((frame) => {
  frame.addEventListener("load", () => {
    frame.classList.add("loaded");
    if (!hover)
      return;
    frame.parentNode.addEventListener("mouseenter", () => {
      frame.contentWindow.postMessage("start");
    });
    frame.parentNode.addEventListener("mouseleave", () => {
      frame.contentWindow.postMessage("stop");
    });
  });
});
if (hover) {
  let links = [...document.getElementsByClassName("experiment")];
  links.forEach((el) => {
    VanillaTilt.init(el, {
      reverse: false,
      max: 5,
      speed: 600,
      gyroscope: false
    });
  });
}
let canvas = document.getElementById("bg");
let sketch = new Sketch2(canvas);
