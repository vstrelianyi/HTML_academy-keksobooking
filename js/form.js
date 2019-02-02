(function(){
  'use strict';

  var form = document.querySelector('.notice__form');

  window.utils.toggleDisabledOnFormFieldsets( form , true);

  // form.querySelectorAll('fieldset').forEach(function( el ){
  //   el.setAttribute('disabled', true);
  // });

})();