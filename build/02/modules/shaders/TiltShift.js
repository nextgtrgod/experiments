import {Vector3} from "/experiments/web_modules/three.js";
import fragmentShader from "./shaders/fragment.glsl.proxy.js";
const TiltShift = {
  uniforms: {
    iResolution: {
      value: new Vector3()
    },
    tDiffuse: {
      value: null
    },
    opacity: {
      value: 1
    }
  },
  vertexShader: `
			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}
		`,
  fragmentShader
};
export {TiltShift};
