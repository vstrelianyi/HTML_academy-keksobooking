(function(){
  'use strict';

  // generate ads array
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
    * Create feature element
    * @param {string} feature
    * @return {HTMLElement}
  */
  var createFeatureElem = function (feature) {
    var featureElem = document.createElement('li');
    featureElem.classList.add('feature', 'feature--' + feature);

    return featureElem;
  };

  /**
    * Render popup
    * @param {Array} featuresArray
    * @return {DocumentFragment}
  */
  var renderFeaturesElem = function (featuresArray) {

    var featuresFragment = document.createDocumentFragment();

    featuresArray.forEach(function (feature) {
      featuresFragment.appendChild( createFeatureElem(feature) );
    });

    return featuresFragment;
  };

  /**
    * Create photo element
    * @param {string} photo
    * @return {HTMLElement}
  */
  var createPhotoElem = function(photo){
    var photoElem = document.createElement('li');
    var photoImgElem = document.createElement('img');
    photoImgElem.src  = photo;
    photoElem.appendChild(photoImgElem);

    return photoElem;
  };

  /**
    * Render photos
    * @param {Array} photosArray
    * @return {DocumentFragment}
  */
 var renderPhotos = function(photosArray){
    var photosFragment = document.createDocumentFragment();

    photosArray.forEach( function( photo ){
      photosFragment.appendChild( createPhotoElem(photo) );
    });

    return photosFragment;
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
    adElem.querySelector('.popup__features').appendChild( renderFeaturesElem(CURRENT_AD.offer.features) );
    adElem.querySelector('.popup__pictures').innerHTML = '';
    adElem.querySelector('.popup__pictures').appendChild( renderPhotos(CURRENT_AD.offer.photos) );

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
    var mapFilterElem = mapElem.querySelector('.map__filters-container');

    // remove fade from map
    // mapElem.classList.remove('map--faded');

    // render pins to map
    mapPinsElem.appendChild(renderPins(adsArray));

    // create ad element
    var adElem = renderAd(CURRENT_AD);

    // render popup to map
    mapElem.insertBefore(adElem, mapFilterElem);
  };
  renderMap();

})();