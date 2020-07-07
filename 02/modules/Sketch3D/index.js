import {
	Scene,
	PerspectiveCamera,
	WebGLRenderer,
	Fog,
	SpotLight,
	// Vector2,
	// SpotLightHelper,
	// SpotLightShadow,
	HemisphereLight,
	// GridHelper,
	// AxesHelper,
} from 'three'

import { WEBGL } from 'three/examples/jsm/WebGL.js'

// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
// import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
// import { TiltShift } from '@/shaders/TiltShift'
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// import * as dat from 'dat.gui'
// const gui = new dat.GUI()

import Landscape from './Landscape'

import { size, count, speed } from './config'

class Sketch3D {
	constructor({
			node,
			height,
			dpi = window.devicePixelRatio,
			antialias = false,
			tryWebGL2 = false,
		}) {
		this.canvas = node
		this.height = height
		// this.dpi = Math.min(dpi, 2)
		this.dpi = dpi
		this.antialias = antialias
		this.tryWebGL2 = tryWebGL2

		this.init()

		window.addEventListener('resize', this.setSize)
		this.setSize()
	}

	createCamera() {
		this.camera = new PerspectiveCamera(
			50,
			window.innerWidth / this.height,
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

		// this.light.shadow.mapSize.width = 1024
		// this.light.shadow.mapSize.height = 1024

		// let spotLightHelper = new SpotLightHelper( this.light )
		// this.scene.add( spotLightHelper )

		// this.light.shadow = new SpotLightShadow(new PerspectiveCamera(20, 1, 1, 250))
		// this.light.castShadow = true

		this.scene.add(
			this.light,
			new HemisphereLight(0xD90FFF, 0x1C1385, .25)
		)

		return

		// gui.add(this.light, 'intensity', 0, 6)

		// let createFolder = (vec3, name) => {
		// 	let folder = gui.addFolder(name)

		// 	Object.keys(vec3).map(key => {
		// 		folder.add(vec3, key, -1000, 1000).onChange(updateLight)
		// 	})

		// 	folder.open()
		// }

		// createFolder(this.light.position, 'position')
		// createFolder(this.light.position, 'target')

		// let updateLight = () => {
		// 	this.light.target.updateMatrixWorld()
		// }
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
		this.renderer.setPixelRatio( this.dpi )
		// this.renderer.setClearColor( 0x1D0F33 )

		// this.renderer.shadowMap.enabled = true
		// this.renderer.shadowMap.type = PCFSoftShadowMap

		// if (process.env.NODE_ENV === 'development') {

		// 	this.controls = new OrbitControls( this.camera, this.renderer.domElement )
		// 	this.controls.enableDamping = true
		// 	this.controls.dampingFactor = 0.25
		// 	this.controls.enableZoom = true
		// 	this.controls.enableRotate = true
		// }

		// document.addEventListener('mousemove', this.getMousePos)

		// this.composer = new EffectComposer( this.renderer )

		// let renderPass = new RenderPass( this.scene, this.camera )
		// this.composer.addPass(renderPass)

		// let bloomPass = new UnrealBloomPass(
		// 	new Vector2( window.innerWidth, window.innerHeight ),
		// 	1.5,
		// 	0.4,
		// 	0.85,
		// )
		// bloomPass.threshold = .25
		// bloomPass.strength = .25
		// bloomPass.radius = .5

		// this.composer.addPass( bloomPass )

		// // let glitchPass = new GlitchPass()
		// // this.composer.addPass( glitchPass )

		// // let tiltShiftPass = new ShaderPass( TiltShift )
		// // this.composer.addPass( tiltShiftPass )
	}

	// getMousePos = e => {
	// 	mouse = {
	// 		x: -1 + 2 * (e.clientX / window.innerWidth), // -1..1
	// 		y: -1 + 2 * (e.clientY / window.innerHeight),
	// 	}
	// }

	setSize() {
		let H = Object.keys(this.height).reduce((s, key) => (
			s = window.innerWidth >= key
				? this.height[key]
				: s
		), 0)

		this.camera.aspect = window.innerWidth / H
		this.camera.updateProjectionMatrix()

		// TiltShift.uniforms.iResolution.value.set(window.innerWidth, H, 1)

		this.renderer.setSize(window.innerWidth, H)
		// this.composer.setSize(window.innerWidth, H)
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

		// this.controls.update()

		// console.log(this.renderer.info.render.calls)

		this.renderer.render(this.scene, this.camera)
		// this.composer.render( this.renderer )
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

export default Sketch3D
