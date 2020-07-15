
varying vec2 vUv;
varying vec3 vNormal;

uniform float uTime;

void main() {
    vUv = uv;
    vNormal = normal;

	// vec3 delta = normal * sin(position.x * position.y * uTime / 10.0);
    // vec3 newPosition = position + delta;

	// vec3 newPosition = vec3(position.x, position.y + 20.0 * uTime, position.z);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
