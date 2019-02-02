(function(){
  'use strict';

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
    * Create features in documentFragment
    * @param {Array} featuresArray
    * @return {DocumentFragment}
  */
  var createFeaturesFragment = function (featuresArray) {
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
    * Create photos list in documentFragment
    * @param {Array} photosArray
    * @return {DocumentFragment}
  */
  var createPhotosFragment = function(photosArray){
    var photosFragment = document.createDocumentFragment();

    photosArray.forEach( function( photo ){
      photosFragment.appendChild( createPhotoElem(photo) );
    });

    return photosFragment;
  };

  /**
    * Create ad element
    * @param {Object} currenAd
    * @return {HTMLElement}
  */
  var createAdElem = function (currenAd) {
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
    adElem.querySelector('.popup__features').appendChild( createFeaturesFragment( currenAd.offer.features) );
    adElem.querySelector('.popup__pictures').innerHTML = '';
    adElem.querySelector('.popup__pictures').appendChild( createPhotosFragment( currenAd.offer.photos) );

    return adElem;
  };

  var onUserPopUpCloseClick = function(){
    var removeNode = this.parentNode;
    removeNode.parentNode.removeChild(removeNode);
  };

  /**
  * Remove ads
  **/
  var removeAds = function(){
    document.querySelectorAll( '.map__card').forEach(function(el){
      el.remove();
    });
  };

  /**
    * Render ads
    * @param {Array} adIdArray
  **/
  var renderAds = function( adIdArray ){

    var mapElem = document.querySelector('.map');
    var mapFilterElem = mapElem.querySelector('.map__filters-container');

    // create current ad element
    var adElem = createAdElem( window.mock_data.ads[adIdArray] ); //current ad

    // render popup to map
    mapElem.insertBefore(adElem, mapFilterElem);

    var popUpCloseElem = document.querySelector('.popup__close');
    popUpCloseElem.addEventListener( 'click', onUserPopUpCloseClick );
  };

  window.ads = {
    removeAds: removeAds,
    renderAds: renderAds
  };

})();