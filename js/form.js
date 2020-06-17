'use strict';
(function () {
  // EXECUTED CODE
  roomsToCapacityValidation();
  typeToPriceValidation();
  timeinToTimeoutValidation();

  // validate that guests number conforms to rooms capacity
  function roomsToCapacityValidation() {
    // валидация соответствия количества комнат количеству гостей

    var roomNumber = document.querySelector('#room_number');
    var capacity = document.querySelector('#capacity');

    var enableCapacityOptions = function () {
      var capacityOptions = document.querySelectorAll('#capacity option');
      capacityOptions.forEach(function (el) {
        el.disabled = false;
      });
    };

    roomNumber.addEventListener('change', function (evt) {
      enableCapacityOptions();
      var roomsValue = evt.target.value;
      var capacityOptions = capacity.querySelectorAll('option');
      var oneGuestCapacity = capacity.querySelector('option[value=\'1\']');
      capacityOptions.forEach(function (el) {
        if (roomsValue === '100') {
          if (el.value === '0') {
            el.selected = true;
            return;
          }
          el.disabled = true;


        } else if (roomsValue === '1') {
          if (el.value === '1') {
            oneGuestCapacity.selected = true;
            return;
          }
          el.disabled = true;

        } else if (roomsValue === '2') {
          if (el.value === '1' || el.value === '2') {
            oneGuestCapacity.selected = true;
            return;
          }
          el.disabled = true;


        } else if (roomsValue === '3') {
          if (el.value === '1' || el.value === '2' || el.value === '3') {
            oneGuestCapacity.selected = true;
            return;
          }
          el.disabled = true;
        }
      });
    });
  }
  // validate apartments type to price
  function typeToPriceValidation() {
    var type = document.querySelector('#type');
    var price = document.querySelector('#price');

    type.addEventListener('change', function (evt) {
      switch (evt.target.value) {
        case 'bungalo':
          price.min = 0;
          price.placeholder = '0';
          break;
        case 'flat':
          price.min = 1000;
          price.placeholder = '1000';
          break;
        case 'house':
          price.min = 5000;
          price.placeholder = '5000';
          break;
        case 'palace':
          price.min = 10000;
          price.placeholder = '10000';
          break;
      }
    });
  }
  function timeinToTimeoutValidation() {
    var timein = document.querySelector('#timein');
    var timeout = document.querySelector('#timeout');

    timein.addEventListener('change', function (evt) {
      switch (evt.target.value) {
        case '12:00':
          timeout.value = '12:00';
          break;
        case '13:00':
          timeout.value = '13:00';
          break;
        case '14:00':
          timeout.value = '14:00';
          break;
      }
    });
    timeout.addEventListener('change', function (evt) {
      switch (evt.target.value) {
        case '12:00':
          timein.value = '12:00';
          break;
        case '13:00':
          timein.value = '13:00';
          break;
        case '14:00':
          timein.value = '14:00';
          break;
      }
    });
  }
})();
