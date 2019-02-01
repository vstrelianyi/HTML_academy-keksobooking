(function(){
  'use strict';

  var form = document.querySelector('.notice__form');

  form.querySelectorAll('fieldset').forEach(function( el ){
    el.setAttribute('disabled', true);
  });

})();