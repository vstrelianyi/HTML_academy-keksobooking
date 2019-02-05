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
  var createAdElem = function (currentAd) {
    var adElem = document.querySelector('template').content.querySelector('article.map__card').cloneNode(true);

    adElem.setAttribute( 'data-ad-id', currentAd.id);

    adElem.querySelector('h3').textContent = currentAd.offer.title;
    adElem.querySelector('p small').textContent = currentAd.offer.address;
    adElem.querySelector('.popup__price').textContent = currentAd.offer.price + '₽/ночь';
    adElem.querySelector('h4').textContent = currentAd.offer.type;
    adElem.querySelector('h4 + p').textContent = currentAd.offer.rooms + ' комнаты для ' + currentAd.offer.guests + ' гостей';
    adElem.querySelector('h4 + p + p').textContent = 'Заезд после ' + currentAd.offer.checkin + ',' + ' выезд до ' + currentAd.offer.checkout;
    adElem.querySelector('.popup__avatar').src = currentAd.author.avatar;
    adElem.querySelector('ul + p').textContent = '';
    adElem.querySelector('.popup__features').innerHTML = '';
    adElem.querySelector('.popup__features').appendChild( createFeaturesFragment( currentAd.offer.features) );
    adElem.querySelector('.popup__pictures').innerHTML = '';
    adElem.querySelector('.popup__pictures').appendChild( createPhotosFragment( currentAd.offer.photos) );

    // events
    adElem.querySelector('.popup__close').addEventListener( 'click', onUserPopUpCloseClick );

    return adElem;
  };

  var onUserPopUpCloseClick = function(){
    var removeNode = this.parentNode;
    removeNode.parentNode.removeChild(removeNode);
  };

  /**
  * Remove ads
  * @param {Array} ads array of ads to remove from map
  **/
  var removeAds = function( ads ){
    ads.forEach(function( ad ){
      console.log( ad )
      ad.remove();
    });
  };

  /**
    * Render ads
    * @param {Array} adIdArray ids' of ads that need to be rendered
  **/
  var renderAds = function( adIdArray ){
    // create current ad element
    var adElem = createAdElem( window.mock_data.ads[adIdArray] ); //current ad

    // render popup to map
    window.elem.map.insertBefore( adElem, window.elem.mapFiltersFormContainer );
  };

  // exports
  window.ads = {
    removeAds: removeAds,
    renderAds: renderAds
  };

})();