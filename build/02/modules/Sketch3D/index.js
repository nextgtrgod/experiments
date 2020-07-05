import {Scene, PerspectiveCamera, WebGLRenderer, Fog, SpotLight, HemisphereLight} from "/experiments/web_modules/three.js";
import {WEBGL} from "/experiments/web_modules/three/examples/jsm/WebGL.js";
import Landscape2 from "./Landscape.js";
import {size, count, speed} from "./config.js";
class Sketch3D {
  constructor({node, height, dpi = window.devicePixelRatio, antialias = false, tryWebGL2 = false}) {
    this.canvas = node;
    this.height = height;
    this.dpi = dpi;
    this.antialias = antialias;
    this.tryWebGL2 = tryWebGL2;
    this.init();
    window.addEventListener("resize", this.setSize);
    this.setSize();
    this.update();
  }
  createCamera() {
    this.camera = new PerspectiveCamera(50, window.innerWidth / this.height, 0.1, size * (count - 2));
    this.camera.position.set(0, 1.8, 3);
  }
  createLight() {
    this.light = new SpotLight(14225407, 0.75);
    this.light.penumbra = 1;
    this.light.angle = 0.5;
    this.light.position.set(0, 120, -size * 5 * count);
    this.scene.add(this.light, new HemisphereLight(14225407, 1840005, 0.25));
    return;
  }
  createSegments() {
    this.segments = [];
    for (let i = 0; i < count; i++) {
      let landscape = new Landscape2(this.scene);
      landscape.container.position.z = -1 * i * size;
      this.segments.push(landscape);
      this.scene.add(landscape.container);
    }
  }
  getContext() {
    if (this.tryWebGL2 && WEBGL.isWebGL2Available())
      return this.canvas.getContext("webgl2");
    return this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");
  }
  init() {
    this.scene = new Scene();
    this.scene.fog = new Fog(1050656, size, size * 2);
    this.scene.position.set(0, 0, 5);
    this.scene.rotation.x = 0;
    this.createCamera();
    this.createLight();
    this.createSegments();
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      context: this.getContext(),
      antialias: this.antialias,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setPixelRatio(this.dpi);
  }
  setSize() {
    let H = Object.keys(this.height).reduce((s, key) => s = window.innerWidth >= key ? this.height[key] : s, 0);
    this.camera.aspect = window.innerWidth / H;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, H);
  }
  update() {
    requestAnimationFrame(() => this.update());
    this.segments.forEach(({container}) => {
      if (container.position.z >= size)
        container.position.z = -1 * size * (count - 1);
      container.position.z += speed;
    });
    this.renderer.render(this.scene, this.camera);
  }
}
export default Sketch3D;
