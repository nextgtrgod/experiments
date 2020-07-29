import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	Fog,
	SpotLight,
	HemisphereLight,
	// GridHelper,
	// AxesHelper,
} from 'three'

import { WEBGL } from 'three/examples/jsm/WebGL.js'

// import * as dat from 'dat.gui'
// const gui = new dat.GUI()

import Landscape from './Landscape'

import { size, count, speed } from './config'

let W = window.innerWidth
let H = window.innerHeight

class Sketch {
	constructor({
		node,
		dpi = window.devicePixelRatio,
		antialias = false,
		tryWebGL2 = false,
	}) {
		this.canvas = node
		this.dpi = dpi
		this.antialias = antialias
		this.tryWebGL2 = tryWebGL2

		this.radId = null

		this.init()

		window.addEventListener('resize', () => this.resize())
	}

	createCamera() {
		this.camera = new PerspectiveCamera(
			50,
			W / H,
			.1,
			size * (count - 2),
		)
		this.camera.position.set(0, 1.8, 3)
	}

	createLight() {
		// this.light = new DirectionalLight(0xD90FFF, 2.5)
		this.light = new SpotLight(0xD90FFF, .75)
		this.light.penumbra = 1
		this.light.angle = .5
		this.light.position.set(0, 120, -size * 5 * count)

		this.scene.add(
			this.light,
			new HemisphereLight(0xD90FFF, 0x1C1385, .25)
		)
	}

	createSegments() {
		this.segments = []

		for (let i = 0; i < count; i++) {

			let landscape = new Landscape(this.scene)
			landscape.container.position.z = -1 * i * size

			this.segments.push(landscape)
			this.scene.add(landscape.container)
		}
	}

	getContext() {
		if (this.tryWebGL2 && WEBGL.isWebGL2Available())
			return this.canvas.getContext('webgl2')

		return this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl')
	}

	init() {
		this.scene = new Scene()
		this.scene.fog = new Fog(0x100820, size, size * 2)

		this.scene.position.set(0, 0, 5)
		this.scene.rotation.x = 0

		// this.scene.add( new GridHelper() )
		// this.scene.add( new AxesHelper() )

		this.createCamera()
		this.createLight()
		this.createSegments()

		this.renderer = new WebGLRenderer({
			canvas: this.canvas,
			context: this.getContext(),
			antialias: this.antialias,
			// precision: 'mediump',
			alpha: true,
			powerPreference: 'high-performance',
		})
		this.renderer.setSize(W, H)
		this.renderer.setPixelRatio( this.dpi )
	}

	resize() {
		W = window.innerWidth
		H = window.innerHeight

		this.camera.aspect = W / H
		this.camera.updateProjectionMatrix()

		this.renderer.setSize(W, H)
		this.draw() // safari fix
	}

	// debug(gl) {
	// 	let debug = gl.getExtension('WEBGL_debug_renderer_info')
	// 	let vendor = gl.getParameter(debug.UNMASKED_VENDOR_WEBGL)
	// 	let renderer = gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)

	// 	console.table({ vendor, renderer })
	// }

	draw() {
		this.segments.forEach(({ container }) => {
			if (container.position.z >= size)
				container.position.z = -1 * size * (count - 1)

			container.position.z += speed
		})

		this.renderer.render(this.scene, this.camera)
	}

	update() {
		this.radId = requestAnimationFrame(() => this.update())
		this.draw()
	}

	start() {
		this.update()
	}

	stop() {
		cancelAnimationFrame(this.radId)
	}
}

export default Sketch
