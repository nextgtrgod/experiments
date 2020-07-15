
import { Vector3 } from 'three'
import fragmentShader from './shaders/fragment.glsl'

const TiltShift = {
	uniforms: {
		iResolution:  { value: new Vector3() },
		tDiffuse: { value: null },
		opacity: { value: 1.0 },
	},
	vertexShader:
		`
			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}
		`,
	fragmentShader,
}

export { TiltShift }
