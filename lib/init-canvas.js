module.exports = function(option, callback) {
	var el = 	document.body
	if(option.elId !== undefined) {
		var el = document.getElementById(option.elId)
	}

	var size = {
		width: window.innerWidth,
		height: window.innerHeight
	}
	if(option.size !== undefined) {
		if(option.size.width !== undefined) { size.width = option.size.width }
		if(option.size.height !== undefined) { size.height = option.size.height }
	}

	var aspectRatio = size.width / size.height

	var camera = {
		fieldOfView: 75,
		aspectRatio: aspectRatio,
		near: 0.1,
		far: 1000
	}
	if(option.camera !== undefined) {
		if(option.camera.fieldOfView !== undefined) { camera.fieldOfView = option.camera.fieldOfView }
		if(option.camera.aspectRatio !== undefined) { camera.aspectRatio = option.camera.aspectRatio }
		if(option.camera.near !== undefined) { camera.near = option.camera.near }
		if(option.camera.far !== undefined) { camera.far = option.camera.far }
	}

	var scene = new THREE.Scene()
	var camera = new THREE.PerspectiveCamera(camera.fieldOfView, camera.aspectRatio, camera.near, camera.far)
	var renderer = new THREE.WebGLRenderer()
	renderer.setSize(size.width, size.height)

	el.appendChild(renderer.domElement)

	callback(THREE, scene, camera, renderer)

}
