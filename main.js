var init = require('./lib/init-canvas')
var data = require('./data.json')
var isMobile = require('./lib/is-mobile')

init({}, function(THREE, scene, camera, renderer) {

	setTimeout(function() { onWindowResize() },100)
	window.addEventListener( 'resize', onWindowResize, false )
	function onWindowResize(){
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize( window.innerWidth, window.innerHeight )
	}

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


document.ontouchmove = function(event){
event.preventDefault();}


window.swipe = {m: false, x1: null, y1: null, x2: null, y2: null}
if(isMobile()) {
	document.addEventListener('touchstart', function(down) {
		down.preventDefault()
		window.swipe.m = true
		window.swipe.x1 = down.touches[0].clientX
		window.swipe.y1 = down.touches[0].clientY
		document.addEventListener('touchmove', function(move) {
			move.preventDefault()
			window.swipe.x2 = move.touches[0].clientX
			window.swipe.y2 = move.touches[0].clientY
		})
		document.addEventListener('touchend', function(up) {
			up.preventDefault()
			window.swipe.m = false
		})
	})
} else {
	document.addEventListener('mousedown', function(down) {
		down.preventDefault()
		window.swipe.m = true
		window.swipe.x1 = down.clientX
		window.swipe.y1 = down.clientY
		document.addEventListener('mousemove', function(move) {
			move.preventDefault()
			window.swipe.x2 = move.clientX
			window.swipe.y2 = move.clientY
		})
		document.addEventListener('mouseup', function(up) {
			up.preventDefault()
			window.swipe.m = false
		})
	})
	document.addEventListener('wheel', function(wheel) {
		wheel.preventDefault()
		camera.position.z = camera.position.z + wheel.deltaY
	})
}


	document.addEventListener('touchstart', function(e) { console.log(e) })

	// RENDER

	function render() {
		var swipe = window.swipe
		if(swipe.m === true) {
			var xMove = swipe.x2 - swipe.x1
			var yMove = swipe.y2 - swipe.y1
			ch.rotation.y = ch.rotation.y + xMove * 0.005
			ch.rotation.x = ch.rotation.x + yMove * 0.005
			window.swipe.x1 = swipe.x2
			window.swipe.y1 = swipe.y2
		}
		requestAnimationFrame( render )
		renderer.render( scene, camera );
	}
	render();

})

