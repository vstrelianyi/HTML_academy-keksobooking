(function(){
  'use strict';

   /** Constants */
  var NOT_FOR_GUESTS_VALUE = '100';
  var NOT_FOR_GUESTS_TEXT = 'не для гостей';

  /** Minimum price map */
  var housingToMinPrice = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  /**
    * Enable notice form for user interactions
  */
  var enableForm = function () {
    window.elem.form.classList.remove('notice__form--disabled');
    window.form.toggleDisabledFormFieldsets( window.elem.form, false);
  };

  /**
    * Sync two input-select options
    * @param {HTMLSelectElement} changedSelect - changed select element
    * @param {HTMLSelectElement} syncingSelect - synced select element
  */
  var syncSelectElemsValue = function ( changedSelect, syncingSelect) {
    var selectedValue = changedSelect.options[changedSelect.selectedIndex].value;

    for (var i = 0; i < syncingSelect.length; i += 1) {
      if (syncingSelect[i].value === selectedValue) {
        syncingSelect[i].selected = true;
        break;
      }
    }
  };

  /**
    * Set minimum room price according to Minimum price map
  */
  var syncTypeWithMinPrice = function () {
    var selectedType = window.elem.typeSelectElem.value;
    var selectedPrice = housingToMinPrice[selectedType];
    console.log( selectedPrice );

    priceInputElem.min = selectedPrice;
    priceInputElem.placeholder = selectedPrice;
  };

  /**
    * set coords for address input field
  */
  var setAddressCoords = function( ){
    var addressInputElem = document.querySelector('[name="address"]');
    var addressObject = window.pinMain.getPinElemNeedleCoords( window.pinMain.getPinMainElemPosition() );
    addressInputElem.value = 'x: ' + addressObject.x +', y: ' + addressObject.y;
  };

  /**
    * @param {HTMLCollection/Array} array
    * @param {String} value
    * @return {Number} index
  */
  var getIndexOfValueFromArray = function( array, value ){
    var index;
    Array.from( array ).forEach( function(el, i){
      // console.log( el.text, value, el.text === value );
      if( el.text === value){
        index = el.index;
      }
    });
    return index;
  };

  /**
    * Disable invalid rooms input numbers regarding number of rooms
  */
  var disableInvalidCapacityValues = function () {
    // var selectedRoom = roomsSelectElem.options[roomsSelectElem.selectedIndex].value;
    var selectedRoom = roomsSelectElem.value;
    var selectedRoomNum = parseFloat(selectedRoom);

    capacityOptionsElems.forEach(function (option) {
      option.disabled = true;
    });

    if (selectedRoom === NOT_FOR_GUESTS_VALUE) {
      capacityOptionsElems[getIndexOfValueFromArray(capacityOptionsElems, 'не для гостей' )].disabled = false;
      return;
    }

    capacityOptionsElems.forEach(function (option) {
      var optionNum = parseFloat(option.value);
      if (optionNum <= selectedRoomNum && optionNum !== 0) {
        option.disabled = false;
      }
    });
  };

  /**
    * Sync rooms with guests
  */
  var syncRoomsWithGuests = function () {
    disableInvalidCapacityValues();
    if (roomsSelectElem.options[roomsSelectElem.selectedIndex].value === NOT_FOR_GUESTS_VALUE) {
      var notForGuestsOption = capacitySelectElem.querySelector('option[value="0"]');
      notForGuestsOption.selected = true;
    } else {
      syncSelectElemsValue(roomsSelectElem, capacitySelectElem);
    }
  };

  /**
    * Callback for input-select event in the form
    * @param {change} event
  */
  var onFormElemChange = function (event) {
    var target = event.target;

    switch (target) {
      case window.elem.checkinSelectElem:
        syncSelectElemsValue(checkinSelectElem, checkoutSelectElem);
        break;
      case window.elem.checkoutSelectElem:
        syncSelectElemsValue(checkoutSelectElem, checkinSelectElem);
        break;
      case window.elem.typeSelectElem:
        syncTypeWithMinPrice();
        break;
      case window.elem.roomsSelectElem:
        syncRoomsWithGuests();
        break;
    }
  };

  var toggleDisabledFormFieldsets = function( form, isDisabled){
    var formElems = Array.from( form.elements );

    formElems.forEach( function( el ){
      el.disabled = isDisabled;
    });
  };

  // syncTypeWithMinPrice();
  // syncRoomsWithGuests();
  // formElem.addEventListener('change', onFormElemChange);

  // exports
  window.form = {
    enableForm: enableForm,
    setAddressCoords: setAddressCoords,
    toggleDisabledFormFieldsets: toggleDisabledFormFieldsets
  };

})();