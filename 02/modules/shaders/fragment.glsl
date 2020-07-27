
varying vec2 vUv;
varying vec3 vNormal;

// uniform float uTime;

uniform vec3 bgColor;
uniform vec3 lineColor;

uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;

#if NUM_DIR_LIGHTS > 0
    struct DirectionalLight {
		vec3 direction;
		vec3 color;
		// int shadow;
		// float shadowBias;
		// float shadowRadius;
		// vec2 shadowMapSize;
    };
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
#endif

vec3 color;
float depth = 1.0;

vec3 light = vec3(1., 0., .2);

void main() {
	#ifdef USE_FOG
		#ifdef USE_LOGDEPTHBUF_EXT
			depth = gl_FragDepthEXT / gl_FragCoord.w;
		#else
			depth = gl_FragCoord.z / gl_FragCoord.w;
		#endif
	#endif
	
	float fogFactor = smoothstep( fogNear, fogFar, depth );

	color = mix(lineColor, bgColor, vUv.x);

	// color = vec4(mix(bgColor.r, lineColor.r, vUv.x), bgColor.g, bgColor.b, 1.);

	float dProd = dot(directionalLights[0].direction, vNormal);

	vec3 c = mix(color, directionalLights[0].color, dProd);

	gl_FragColor = vec4(c, 1.);

	// gl_FragColor = mix(color, fogColor, fogFactor);
}
