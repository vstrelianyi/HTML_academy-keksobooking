(function(){
  'use strict';

  /**
    * Генерирует случайное число от min до max. Если без третьего параметра --- не включая max, с --- включая max
    * @param {number} min_value
    * @param {number} max_value
    * @return {number}
  */
  var getRandomNum = function(min_value , max_value) {
    var random_number = Math.random() * (max_value - min_value) + min_value;
    return Math.round(random_number);
  };

  /**
    * Генерирует случайный массив указанного размера из массива
    * @param {Array} sourceArray
    * @param {number} neededElements
    * @return {Array}
  */
  var getRandomElements = function(sourceArray, neededElements) {
    var shuffled = sourceArray.sort(function(){
      return 0.5 - Math.random();
    });
    var selected = shuffled.slice(0, neededElements);
    return selected;
  };

  /**
    * Превращает число в строку, добавляя ноль перед num-числом к однозначным num
    * @param {number} num
    * @return {string}
  */
  var addZero = function (num) {
    return (num < 10 ? '0' : '') + num;
  };

  /**
    * Возвращает адрес изображения
    * @param {number} avatar
    * @return {string}
  */
  var getAvatarUrl = function (avatar) {
    return 'img/avatars/user' + addZero(avatar) + '.png';
  };

  window.utils = {
    getRandomNum: getRandomNum,
    getRandomElements: getRandomElements,
    getAvatarUrl: getAvatarUrl
  };

})();