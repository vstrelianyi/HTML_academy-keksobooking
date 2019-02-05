(function(){
  'use strict';

  /**
   * Enable map for user interactions
   */
  var enableMap = function () {
    window.elem.map.classList.remove('map--faded');
  };

  // exports
  window.map = {
    enableMap: enableMap,
  };

})();