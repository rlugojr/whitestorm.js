/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.API.loadMaterial = function( material = {}, isPhysics = true ) {
	
	'use strict';

	if ( typeof material.kind !== "string" )
		console.error( "Type of material is undefined or not a string. @loadMaterial" );

	var scope = {
		_type: material.kind,
		_restitution: !isNaN(parseFloat(material.restitution)) ? 
			material.restitution :  !isNaN(parseFloat(material.rest)) ? 
			material.rest : 0.3,
		_friction: !isNaN(parseFloat(material.friction)) ? 
			material.friction :  !isNaN(parseFloat(material.fri)) ? 
			material.fri : 0.8,
	};

	if ( material.texture ) material.map = WHS.API.texture( material.texture );

	var params = WHS.API.extend( {}, material );

	delete params[ "kind" ];

	delete params[ "friction" ];
	delete params[ "fri" ];

	delete params[ "restitution" ];
	delete params[ "rest" ];

	delete params[ "useCustomMaterial" ];
	delete params[ "useVertexColors" ];

	switch ( material.kind ) {
		case "basic":
			scope._material = new THREE.MeshBasicMaterial( params );
		break;

		case "linebasic":
			scope._material = new THREE.LineBasicMaterial( params );
		break;

		case "linedashed":
			scope._material = new THREE.LineDashedMaterial( params );
		break;

		case "material":
			scope._material = new THREE.Material( params );
		break;

		case "depth":
			scope._material = new THREE.MeshDepthMaterial( params );
		break;

		case "face":
			scope._material = new THREE.MeshFaceMaterial( params );
		break;

		case "lambert":
			scope._material = new THREE.MeshLambertMaterial( params );
		break;

		case "normal":
			scope._material = new THREE.MeshNormalMaterial( params );
		break;

		case "phong":
			scope._material = new THREE.MeshPhongMaterial( params );
		break;

		case "pointcloud":
			scope._material = new THREE.PointCloudMaterial( params );
		break;

		case "rawshader":
			scope._material = new THREE.RawShaderMaterial( params );
		break;

		case "shader":
			scope._material = new THREE.ShaderMaterial( params );
		break;

		case "spritecanvas":
			scope._material = new THREE.SpriteCanvasMaterial( params );
		break;

		case "sprite":
			scope._material = new THREE.SpriteMaterial( params );
		break;
	}

	if ( isPhysics ) 
		scope._materialP = Physijs.createMaterial( 
			scope._material, 
			scope._friction, 
			scope._restitution 
		);

	return scope;

}
