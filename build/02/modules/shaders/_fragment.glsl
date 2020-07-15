
#define EPSILON 0.02

// #pragma glslify: grid = require(glsl-solid-wireframe/barycentric/scaled)

varying vec2 vUv;

uniform float uTime;

uniform vec3 bgColor;
uniform vec3 lineColor;

uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;

vec4 color;
float depth = 1.0;

void main() {
    // if ((fract(vUv.x * 40.0) < EPSILON) || (fract((vUv.y - 2. * uTime) * 40.0) < EPSILON)) {
	if ((fract(vUv.x * 25.0) < EPSILON) || (fract(vUv.y * 24.0) < EPSILON)) {
        color = vec4(lineColor, 1.0);
    } else {
       	color = vec4(bgColor, .75);
    }

	#ifdef USE_FOG
		#ifdef USE_LOGDEPTHBUF_EXT
			depth = gl_FragDepthEXT / gl_FragCoord.w;
		#else
			depth = gl_FragCoord.z / gl_FragCoord.w;
		#endif
	#endif
	
	float fogFactor = smoothstep( fogNear, fogFar, depth );

	gl_FragColor = mix(color, vec4(fogColor, 1.0), fogFactor);

	// gl_FragColor = vec4(vec3(grid(b, 1.0)), 1);
}
