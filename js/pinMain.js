(function(){
  'use strict';


  /**
    * Get position of map pin--main element
  */
  var getPinMainElemPosition = function(){
    return {
      x: window.elem.mapPinMain.offsetLeft,
      y: window.elem.mapPinMain.offsetTop
    };
  };

  /**
    * Gets main pin element position, calculates coords of the pin needle and changes the form adress input
    * @param {Object} position
  */
  var getPinElemNeedleCoords = function ( position ) {
    // Pin elements parameters
    var NEEDLE_HEIGHT = 22;
    var USER_PIN_NEEDLE_POSITION = window.elem.mapPinMain.offsetWidth / 2;
    var USER_PIN_HEIGHT = window.elem.mapPinMain.offsetHeight + NEEDLE_HEIGHT;

    var updatedCoords = {
      x: position.x + USER_PIN_NEEDLE_POSITION,
      y: position.y + USER_PIN_HEIGHT
    };

    return updatedCoords;
  };

  /**
    * on first mouse click enable map, then remove all listeners
  */
  var onUserPinMouseUp = function( event ){
    window.map.enableMap();
    window.form.enableForm();
    window.form.setAddressCoords();

    window.pins.renderPins( window.mock_data.ads );

    this.removeEventListener('mouseup', onUserPinMouseUp);
    this.removeEventListener('keydown', onUserPinEnterPress);
  };

  /**
    * on first enter/spacebar click enable map, then remove all listeners
    * @param {KeyboardEvent}
  */
  var onUserPinEnterPress = function (event ) {
    if (event.keyCode === window.constants.Keycode.ENTER || event.keyCode === window.constants.Keycode.SPACE) {
      window.map.enableMap();
      window.form.enableForm();
      window.form.setAddressCoords();

      window.pins.renderPins( window.mock_data.ads );

      this.removeEventListener( 'keydown' , onUserPinEnterPress);
      this.removeEventListener( 'mouseup' , onUserPinMouseUp);
    }
  };

  var events = function(){
    window.elem.mapPinMain.addEventListener( 'mouseup' , onUserPinMouseUp );
    window.elem.mapPinMain.addEventListener( 'keydown' , onUserPinEnterPress);
  };

  // exports
  window.pinMain = {
    getPinMainElemPosition: getPinMainElemPosition,
    getPinElemNeedleCoords: getPinElemNeedleCoords,
    events : events
  };

})();