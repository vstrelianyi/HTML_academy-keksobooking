(function(){
  'use strict';

  /** Количество нужных объявлений */
  var OFFERS_COUNT = 8;

  /** Массивы-константы, полученные из ТЗ */
  var ALL_AVATARS = [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png'
  ];

  var ALL_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var ALL_ADDRESSES = [
    [100,200],
    [300,350],
    [500,200],
    [600,300],
    [850,400],
    [700,600],
    [250,250],
    [850,400]
  ];

  var ALL_PRICES = [];

  var ALL_TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'];

  var ALL_ROOMS = [];

  var ALL_GUESTS = [];

  var ALL_CHECKINS = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var ALL_CHECKOUTS = ALL_CHECKINS.slice();

  var ALL_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var ALL_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var ALL_LOCATIONS = ALL_ADDRESSES.slice();

  // ad object structure
  /**
  var ads = [
    {
      'author': {
        'avatar': ''
      },
      'offer': {
        'title': '',
        'address': '',
        'price': '',
        'type': '',
        'rooms': '',
        'guests': '',
        'checkin': '',
        'checkout': '',
        'features': '',
        'description': '',
        'photos': '',
      }
    }
  ];
  **/

  /**
    * Создает массив объявлений
    * @param {number} objectsCount - Количество нужных объектов
    * @return {Array}
  */
  var generateAds = function( objectsCount ){
    var targetArray = [];
    for( var i = 0; i < objectsCount; i++){

      targetArray[i]= {
        id : i,
        author: {
          avatar: window.utils.getAvatarUrl(i + 1)
        },
        offer:{
          title: ALL_TITLES[i],
          address: [ ALL_LOCATIONS[i][0], ALL_LOCATIONS[i][1] ],
          price: Math.round( window.utils.getRandomNum( 1000, 1000000)/1000) * 1000,
          type: ALL_TYPES[window.utils.getRandomNum( 0, 3)],
          rooms: window.utils.getRandomNum( 1, 6 ),
          guests: window.utils.getRandomNum( 1, 10 ),
          checkin: ALL_CHECKINS[window.utils.getRandomNum( 0, 2 )],
          checkout: ALL_CHECKOUTS[window.utils.getRandomNum( 0, 2 )],
          features: window.utils.getRandomElements( ALL_FEATURES, window.utils.getRandomNum( 1, 5 ) ),
          description: '',
          photos: ALL_PHOTOS
        },
        location: {
          x: ALL_LOCATIONS[i][0],
          y: ALL_LOCATIONS[i][1]
        }
      };
    }
    return targetArray;

  };

  window.ads = {
    generateAds : generateAds
  };

})();