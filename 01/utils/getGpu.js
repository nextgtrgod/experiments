
let getGpu = () => {
	let gl = document.createElement('canvas').getContext('webgl')

	if (!gl) return { error: 'no webgl' }

	let debugInfo = gl.getExtension('WEBGL_debug_renderer_info')

	if (debugInfo)
		return {
			vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
			renderer:  gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
		}
	
	return {
		error: 'no WEBGL_debug_renderer_info'
	}
}

export default getGpu
