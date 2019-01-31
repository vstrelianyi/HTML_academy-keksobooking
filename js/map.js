(function(){
  'use strict';

  var adsArray = window.ads.generateAds( 8 );
  var CURRENT_AD = adsArray[0];

  // ------------------------
  // PINS
  // ------------------------
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
  * Render pins
    * @param {Array} ads
    * @return {DocumentFragment}
  */
  var renderPins = function (ads) {
    var pinFragment = document.createDocumentFragment();

    ads.forEach(function (ad) {
      pinFragment.appendChild(createPinElem(ad.location, ad.author.avatar, ad.id));
    });
    return pinFragment;
  };

  // ------------------------
  // POPUP
  // ------------------------

  /**
    * Create popup
    * @param {string} popup
    * @return {HTMLElement}
  */
  var createPopupElem = function (popup) {
    var popupElem = document.createElement('li');
    popupElem.classList.add('feature', 'feature--' + popup);

    return popupElem;
  };

  /**
    * Render popup
    * @param {Array} popupArray
    * @return {DocumentFragment}
  */
  var renderPopupElem = function (popupArray) {
    var popupFragment = document.createDocumentFragment();

    popupArray.forEach(function (popup) {
      popupFragment.appendChild(createPopupElem(popup));
    });

    return popupFragment;
  };

  // ------------------------
  // ADS
  // ------------------------

  /**
    * Render ad
    * @param {Object} currenAd
    * @return {HTMLElement}
  */
  var renderAd = function (currenAd) {
    var adElem = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);
    adElem.querySelector('h3').textContent = currenAd.offer.title;
    adElem.querySelector('p small').textContent = currenAd.offer.address;
    adElem.querySelector('.popup__price').textContent = currenAd.offer.price + '₽/ночь';
    adElem.querySelector('h4').textContent = currenAd.offer.type;
    adElem.querySelector('h4 + p').textContent = currenAd.offer.rooms + ' комнаты для ' + currenAd.offer.guests + ' гостей';
    adElem.querySelector('h4 + p + p').textContent = 'Заезд после ' + currenAd.offer.checkin + ',' + ' выезд до ' + currenAd.offer.checkout;
    adElem.querySelector('.popup__avatar').src = currenAd.author.avatar;
    adElem.querySelector('ul + p').textContent = '';
    adElem.querySelector('.popup__features').innerHTML = '';

    return adElem;
  };

  // ------------------------
  // MAP
  // ------------------------

  /**
    * Render map with pins and ads
  **/
  var renderMap = function(){
    var mapElem = document.querySelector('.map');
    var mapPinsElem = mapElem.querySelector('.map__pins');

    // remove fade from map
    mapElem.classList.remove('map--faded');

    // render pins to map
    mapPinsElem.appendChild(renderPins(adsArray));

    // render popup to map
    var addElem = renderAd(CURRENT_AD);
    addElem.querySelector('.popup__features').appendChild( renderPopupElem(CURRENT_AD.offer.features) );
    var fragment = document.createDocumentFragment();
    fragment.appendChild(addElem);
    mapElem.appendChild(fragment);
  };
  renderMap();

})();