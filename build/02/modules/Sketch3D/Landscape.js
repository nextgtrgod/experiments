import {Vector3, LineBasicMaterial, MeshPhongMaterial, PlaneGeometry, LineSegments, Mesh, Object3D, BufferGeometry, BufferAttribute} from "/web_modules/three.js";
import {n, gap, size} from "./config.js";
import rnd from "../../utils/random.js";
let random2 = rnd.seed(42);
let f = (A, B, x, C = 0, D = 0) => A * Math.sin(B * x + C) + D;
const PI = Math.PI;
let subdivide = (start, end, q) => {
  let points = [];
  ["x", "y", "z"].map((axis) => {
    let step = (end[axis] - start[axis]) / (q - 1);
    for (let n2 = 1; n2 < q - 1; n2++) {
      if (!points[n2 - 1])
        points[n2 - 1] = new Vector3(0, 0, 0);
      points[n2 - 1][axis] = start[axis] + n2 * step;
    }
  });
  return [start, ...points, end];
};
let lineMaterial = new LineBasicMaterial({
  color: 15346170
});
let planeMaterial = new MeshPhongMaterial({
  color: 1906056,
  specular: 14483958
});
class Landscape {
  constructor(scene) {
    this.container = new Object3D();
    this.container.position.set(-(size / 2), -1.5, 0);
    this.plane = new Mesh(new PlaneGeometry(size, size, n - 1, n - 1), planeMaterial);
    this.plane.rotation.x = -PI / 2;
    this.plane.position.set(size / 2, -0.001, -(size / 2), 0);
    {
      let positions = new Float32Array(n * n * 3);
      let indices = [];
      for (let z = n - 1, i = 0; z >= 0; z--, i++) {
        let vs = subdivide(new Vector3(0, 0, -z * gap), new Vector3(size, 0, -z * gap), n);
        vs.forEach((v, j) => {
          positions[i * (n * 3) + j * 3 + 0] = v.x;
          positions[i * (n * 3) + j * 3 + 1] = v.y;
          positions[i * (n * 3) + j * 3 + 2] = v.z;
          if (j === n - 1)
            return;
          indices.push(i * n + j, i * n + j + 1);
        });
      }
      let geometry = new BufferGeometry();
      geometry.setAttribute("position", new BufferAttribute(positions, 3));
      geometry.setIndex(new BufferAttribute(new Uint16Array(indices), 1));
      this.horizontal = new LineSegments(geometry, lineMaterial);
    }
    {
      let positions = new Float32Array(n * n * 3);
      let indices = [];
      for (let i = 0; i < n; i++) {
        let vs = subdivide(new Vector3(i * gap, 0, -size), new Vector3(i * gap, 0, 0), n);
        vs.forEach((v, j) => {
          positions[i * n * 3 + j * 3] = v.x;
          positions[i * n * 3 + j * 3 + 1] = v.y;
          positions[i * n * 3 + j * 3 + 2] = v.z;
          if (j === n - 1)
            return;
          indices.push(i * n + j, i * n + j + 1);
        });
      }
      let geometry = new BufferGeometry();
      geometry.setAttribute("position", new BufferAttribute(positions, 3));
      geometry.setIndex(new BufferAttribute(new Uint16Array(indices), 1));
      this.vertical = new LineSegments(geometry, lineMaterial);
    }
    this.randoms = [];
    for (let i = 0; i < n ** 2; i++) {
      this.randoms.push(random2.range(-1.5, 0));
    }
    this.update();
    this.container.add(this.plane, this.horizontal, this.vertical);
  }
  update() {
    for (let i = 0; i < n; i++) {
      let q = f(2, 4 * PI, i / (n - 1), -PI / 2) + Math.abs(f(random2.range(1, 2), PI, i / (n - 1), PI));
      if (i === n - 1)
        q = -6;
      for (let j = 0; j < n; j++) {
        let w = f(random2.range(4, 5), 3 * PI, j / (n - 1));
        let offset = Math.max(1.5, w + q + this.randoms[i * n + j]);
        this.horizontal.geometry.attributes.position.array[i * n * 3 + j * 3 + 1] = offset;
        this.vertical.geometry.attributes.position.array[j * n * 3 + i * 3 + 1] = offset;
        this.plane.geometry.vertices[i * n + j].z = offset;
      }
    }
    this.vertical.geometry.attributes.position.needsUpdate = true;
    this.horizontal.geometry.attributes.position.needsUpdate = true;
    this.plane.geometry.verticesNeedUpdate = true;
  }
}
export default Landscape;
