(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
var init = require('./lib/init-canvas')
var data = require('./data.json')

init({}, function(THREE, scene, camera, renderer) {

	// CONTROLS

	var b = document.body
	var ctrl = document.createElement('IMG')
	ctrl.style.position = 'fixed'
	ctrl.style.left = '10px'
	ctrl.style.top = '10px'
	ctrl.src='ctrl.png'
	b.appendChild(ctrl)

	// GEOMETRY

	var geometry = new THREE.Geometry();

	for(i=0;i<data.points.length;i++) {
		var p = data.points[i]
		geometry.vertices.push(new THREE.Vector3(p[0], p[1], p[2]))
	}
	for(i=0;i<data.triangles.length;i++) {
		var t = data.triangles[i]
		geometry.faces.push( new THREE.Face3(t.p[0], t.p[1], t.p[2]) )
		geometry.faces[i].vertexColors = new THREE.Color() 
		geometry.faces[i].color.setHex(t.c)
	}

	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	// MATERIAL

	var material = new THREE.MeshLambertMaterial({ vertexColors: THREE.FaceColors })
	material.side = 1

	// SCENE

	var ch = new THREE.Mesh( geometry,  material)
	scene.add(ch)

	// LIGHT

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9);
	directionalLight.position.set( 0, 1, 1 );
	scene.add( directionalLight );

	// CAMERA

	camera.position.z = 100
	camera.position.x = 0
	camera.position.y = 0

	document.addEventListener('keydown', function(e) {
		console.log(e.key)
		if(e.keyCode === 38) { camera.position.y = camera.position.y + 2 }
		if(e.keyCode === 40) { camera.position.y = camera.position.y - 2 }
		if(e.keyCode === 39) { camera.position.x = camera.position.x + 2 }
		if(e.keyCode === 37) { camera.position.x = camera.position.x - 2 }
		if(e.keyCode === 81) { camera.position.z = camera.position.z - 2 }
		if(e.keyCode === 65) { camera.position.z = camera.position.z + 2 }
		if(e.keyCode === 69) { ch.rotation.x = ch.rotation.x + 0.1 }
		if(e.keyCode === 68) { ch.rotation.x = ch.rotation.x - 0.1 }
		if(e.keyCode === 70) { ch.rotation.y = ch.rotation.y + 0.1 }
		if(e.keyCode === 83) { ch.rotation.y = ch.rotation.y - 0.1 }
	})


	// RENDER

	function render() {
		requestAnimationFrame( render )
		renderer.render( scene, camera );
	}
	render();

})


},{"./data.json":1,"./lib/init-canvas":2}]},{},[3]);