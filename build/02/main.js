import Sketch3D2 from "./modules/Sketch3D/index.js";
let sketch3D = new Sketch3D2({
  node: document.getElementById("canvas"),
  height: {
    0: 420,
    720: 560,
    960: 820
  },
  antialias: true,
  tryWebGL2: true
});
