uniform vec3 iResolution;
uniform float opacity;
uniform sampler2D tDiffuse;
varying vec2 vUv;

void main() {

	vec4 color = texture2D( tDiffuse, vUv );

	gl_FragColor = vec4(color.rgb, sin(vUv.x));
}
