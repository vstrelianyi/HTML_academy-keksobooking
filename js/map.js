(function(){
  'use strict';

  var adsArray = window.ads.generateAds( 8 );
  var CURRENT_AD = adsArray[0];

  //
  // PINS
  //
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinImgElem = pinTemplate.querySelector('img');

  /** pin constants */
  var PIN_HEIGHT = 18;
  var PIN_OFFSET_X = pinImgElem.getAttribute('width') / 2;
  var PIN_OFFSET_Y = parseFloat(pinImgElem.getAttribute('height')) + PIN_HEIGHT;

  /**
  * create pin elements
    * @param {Object} coordinates
    * @param {string} avatar
    * @return {HTMLElement}
  */
  var createPinElem = function (coordinates, avatar) {
    var pinElem = pinTemplate.cloneNode(true);
    pinElem.querySelector('img').src = avatar;

    pinElem.style.left = coordinates.x - PIN_OFFSET_X + 'px';
    pinElem.style.top = coordinates.y - PIN_OFFSET_Y + 'px';
    pinElem.classList.add('map__pin');

    return pinElem;
  };

  /**
  * render pins
    * @param {Array} ads
    * @return {DocumentFragment}
  */
  var renderPins = function (ads) {
    var pinFragment = document.createDocumentFragment();

    ads.forEach(function (ad) {
      pinFragment.appendChild(createPinElem(ad.location, ad.author.avatar));
    });
    return pinFragment;
  };

  //
  // FEATURES
  //

  /**
    * Готовит фрагмент фичи
    * @param {string} feature
    * @return {HTMLElement}
  */
  var createFeaturesElem = function (feature) {
    var featureElem = document.createElement('li');
    featureElem.classList.add('feature', 'feature--' + feature);

    return featureElem;
  };

  /**
    * Рендерит фрагмент фичи
    * @param {Array} featuresArray
    * @return {DocumentFragment}
  */
  var renderFeaturesElem = function (featuresArray) {
    var featuresFragment = document.createDocumentFragment();

    featuresArray.forEach(function (feature) {
      featuresFragment.appendChild(createFeaturesElem(feature));
    });

    return featuresFragment;
  };

  //
  // ADS
  //

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

  //
  // MAP
  //

  /**
    * Render map with pins and ads
  **/
  var renderMap = function(){
    var mapElem = document.querySelector('.map');
    var mapPinsElem = mapElem.querySelector('.map__pins');
    var mapFiltersElem = document.querySelector('.map__filters-container');

    mapElem.classList.remove('map--faded');

    var fragment = document.createDocumentFragment();

    var addElem = renderAd(CURRENT_AD);

    addElem.querySelector('.popup__features').appendChild(renderFeaturesElem(CURRENT_AD.offer.features));
    mapPinsElem.appendChild(renderPins(adsArray));
    fragment.appendChild(addElem);
    mapFiltersElem.appendChild(fragment);
  };
  renderMap();

})();