(function(){
  'use strict';

  var mapElem = document.querySelector('.map');
  var mapPinMainElem = mapElem.querySelector( '.map__pin--main' );

  var mapFiltersFormElem = mapElem.querySelector('.map__filters');
  var noticeFormElem = document.querySelector('.notice__form');


  var removeInactive = function(){

    console.log( 'mouse');
  };

  mapPinMainElem.addEventListener( 'mouseup' , removeInactive );

})();