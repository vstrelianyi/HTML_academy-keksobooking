(function(){
  'use strict';

  var mapElem = document.querySelector('.map');
  var mapPinMainElem = mapElem.querySelector( '.map__pin--main' );

  var overlayElem = mapElem.querySelector('.map__pinsoverlay');

  /**
    * Константы размеров пользовательского пина
  */
  var NEEDLE_HEIGHT = 22;
  var USER_PIN_NEEDLE_POSITION = mapPinMainElem.offsetWidth / 2;
  var USER_PIN_HEIGHT = mapPinMainElem.offsetHeight + NEEDLE_HEIGHT;

  /**
    * Pin drag limits
  */
  var PIN_LIMITS = {
    y: {
      top: 100,
      /** Нижний предел рассчитывается через
       *  высоту отца - высоту таскаемого элемента - 500 */
      bottom: overlayElem.offsetHeight - mapPinMainElem.offsetHeight - 500
    }
  };

  /** server data */
  var initialAds;

  /** ads filtered by user */
  var filteredAds;

  mapPinMainElem.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();

    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var bounds = {
        xMin: 40,
        yMin: 40,
        xMax: 1160,
        yMax: 650
      };

      // control bounds of the main pin
      if( mapPinMainElem.offsetLeft <= bounds.xMin ){
        mapPinMainElem.style.left = bounds.xMin + 5 + 'px';
      }
      if( mapPinMainElem.offsetLeft >= bounds.xMax ){
        mapPinMainElem.style.left = bounds.xMax - 5  + 'px';
      }
      if( mapPinMainElem.offsetTop <= bounds.yMin ){
        mapPinMainElem.style.top = bounds.yMin + 5 + 'px';
      }
      if( mapPinMainElem.offsetTop >= bounds.yMax ){
        mapPinMainElem.style.top = bounds.yMax - 5 + 'px';
      }
      else{
        mapPinMainElem.style.left = ( mapPinMainElem.offsetLeft - shift.x ) + 'px';
        mapPinMainElem.style.top = ( mapPinMainElem.offsetTop - shift.y ) + 'px';
        window.form.setAddressCoords();
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          mapPinMainElem.removeEventListener('click', onClickPreventDefault );
        };
        mapPinMainElem.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // exports

})();