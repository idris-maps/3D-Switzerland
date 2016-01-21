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

