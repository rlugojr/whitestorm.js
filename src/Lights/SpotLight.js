/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS spot light.
 *
 * @extends WHS.Light
 */
WHS.SpotLight = class SpotLight extends WHS.Light {
    /**
     * Point light.
     *
     * @param {Object} params.light.color - Light color.
     * @param {Object} params.light.intensity - Light intensity.
     * @param {Object} params.light.distance - Light distance.
     * @param {Object} params.light.angle - Light angle.
     * @param {Object} params.light.exponent - Light exponent.
     * @param {Object} params.light.decay - Light decay.
     */
	constructor( params = {} ) {

		super( params, "spotlight" );

		this.build( params );

        super.wrap();
        super.wrapShadow();

	}

    build( params = {} ) {

        let _scope = this;

        return new Promise( (resolve, reject) => {
            _scope.setNative( new THREE.SpotLight(
                params.light.color,
                params.light.intensity,
                params.light.distance,
                params.light.angle,
                params.light.exponent,
                params.light.decay
            ) );

            if ( params.helper )
                _scope.helper = new THREE.SpotLightHelper( _scope.light );

            resolve();
        });

    }

}

WHS.World.prototype.SpotLight = function( params ) {
    let object = new WHS.SpotLight( params );

    object.addTo( this );

    return object;
}
