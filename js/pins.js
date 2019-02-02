(function(){
  'use strict';

  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinImgElem = pinTemplate.querySelector('img');

  /** Pin constants */
  var PIN_HEIGHT = 18;
  var PIN_OFFSET_X = pinImgElem.getAttribute('width') / 2;
  var PIN_OFFSET_Y = parseFloat(pinImgElem.getAttribute('height')) + PIN_HEIGHT;

  /**
  * Create pin elements
    * @param {Object} coordinates
    * @param {string} avatar
    * @return {HTMLElement}
  */
  var createPinElem = function (coordinates, avatar, id) {
    var pinElem = pinTemplate.cloneNode(true);
    pinElem.querySelector('img').src = avatar;

    pinElem.style.left = coordinates.x - PIN_OFFSET_X + 'px';
    pinElem.style.top = coordinates.y - PIN_OFFSET_Y + 'px';
    pinElem.classList.add('map__pin');
    pinElem.setAttribute('data-id', id);

    return pinElem;
  };

  /**
  * Create pins fragment
    * @param {Array} ads
    * @return {DocumentFragment}
  */
  var createPinsFragment = function (ads) {
    var pinFragment = document.createDocumentFragment();

    ads.forEach(function (ad) {
      pinFragment.appendChild(createPinElem(ad.location, ad.author.avatar, ad.id));
    });
    return pinFragment;
  };

  /**
   * Add event listeners to pins with open advertisement popup callback
   */
  var addPinEventListeners = function(){
    var mapPinElems = document.querySelectorAll('.map__pin');
    mapPinElems.forEach( function(el){
      el.addEventListener( 'click', showAd );
    });
  };

  /**
   * Show advertisement by id which is taken from click event
   * @param {clickdEvent} event
   */
  var showAd = function( event ){
    var id = this.getAttribute( 'data-id' );
    if( id ){
      window.ads.renderAds( id );
    }
  };

  /**
  * render pins to map
  */
  var mapPinsElem = document.querySelector('.map__pins');
  var renderPins = function(){
    mapPinsElem.appendChild( createPinsFragment( window.mock_data.ads ) );

    addPinEventListeners();
  };

  window.pins = {
    renderPins: renderPins
  };

})();