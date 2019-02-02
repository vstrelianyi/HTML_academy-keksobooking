(function(){
  'use strict';

  var mapElem = document.querySelector('.map');

  /**
   * Enable map for user interactions
   */
  var enableMap = function () {
    var mapFiltersFormElem = mapElem.querySelector('.map__filters');
    mapElem.classList.remove('map--faded');
    window.form.toggleDisabledOnFormFieldsets(mapFiltersFormElem, false);
    window.pins.renderPins( window.mock_data.ads );
  };

  /**
   * Enable notice form for user interactions
   */
  var enableForm = function () {
    var noticeFormElem = document.querySelector('.notice__form');
    noticeFormElem.classList.remove('notice__form--disabled');
    window.form.toggleDisabledOnFormFieldsets(noticeFormElem, false);
  };

  /**
  * on first mouse click enable map, then remove all listeners
  */
  var onUserPinMouseUp = function( event ){
    enableMap();
    enableForm();
    this.removeEventListener('mouseup', onUserPinMouseUp);
    this.removeEventListener('keydown', onUserPinEnterPress);
  };

  /**
  * on first enter/spacebar click enable map, then remove all listeners
  * @param {KeyboardEvent}
  */
  var onUserPinEnterPress = function (event ) {
    if (event.keyCode === window.constants.Keycode.ENTER || event.keyCode === window.constants.Keycode.SPACE) {
      enableMap();
      enableForm();
      this.removeEventListener( 'keydown' , onUserPinEnterPress);
      this.removeEventListener( 'mouseup' , onUserPinMouseUp);
    }
  };

  var mapPinMainElem = mapElem.querySelector( '.map__pin--main' );
  mapPinMainElem.addEventListener( 'mouseup' , onUserPinMouseUp );
  mapPinMainElem.addEventListener( 'keydown' , onUserPinEnterPress);

})();