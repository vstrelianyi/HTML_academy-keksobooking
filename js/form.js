(function(){
  'use strict';

  var formElem = document.querySelector('.notice__form');

  var toggleDisabledOnFormFieldsets = function( form, isDisabled){
    var formElems = Array.from( form.elements );

    formElems.forEach( function( el ){
      el.disabled = isDisabled;
    });
  };

  toggleDisabledOnFormFieldsets( formElem , true);

  var updateAdress = function( x , y){
    var addressInputElem = document.querySelector('[name="address"]');
    addressInputElem.value = 'x: ' + x +', y: ' + y;
  };

  window.form = {
    updateAdress: updateAdress,
    toggleDisabledOnFormFieldsets: toggleDisabledOnFormFieldsets
  };

  // form.querySelectorAll('fieldset').forEach(function( el ){
  //   el.setAttribute('disabled', true);
  // });

})();