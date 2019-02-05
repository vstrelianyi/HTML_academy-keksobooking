(function(){
  'use strict';

  // elements

  window.elem = {
    map : document.querySelector('.map'),
    get mapPinMain(){ return this.map.querySelector( '.map__pin--main' ); },
    get mapFiltersFormContainer(){ return this.map.querySelector('.map__filters-container'); },
    get mapFiltersForm(){ return this.map.querySelector('.map__filters'); },

    get pins(){ return document.querySelectorAll('.map__pin') },

    get ads(){ return document.querySelectorAll( '.map__card' ); },

    form: document.querySelector('.notice__form'),
    get typeSelectElem(){ return this.form.querySelector('#type'); },
    get priceInputElem(){ return this.form.querySelector('#price'); },
    get addressInputElem(){ return this.form.querySelector('#address'); },
    get checkinSelectElem(){ return this.form.querySelector('#timein'); },
    get checkoutSelectElem(){ return this.form.querySelector('#timeout'); },
    get roomsSelectElem(){ return this.form.querySelector('#room_number'); },
    get capacitySelectElem(){ return this.form.querySelector('#capacity'); },
    get capacityOptionsElems(){ return this.form.querySelector('#option'); }
  };

  window.pinMain.events();

  window.form.toggleDisabledFormFieldsets( window.elem.mapFiltersForm, false);
  window.form.toggleDisabledFormFieldsets( window.elem.form , false);


})();