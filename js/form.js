'use strict';
(function () {
  // EXECUTED CODE

  roomsToCapacityValidation();
  typeToPriceValidation();
  timeinToTimeoutValidation();
  formSubmission();

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

  // form submission process
  function formSubmission() {
    var form = document.querySelector(".ad-form");
    form.addEventListener('submit', function(evt) {
      window.data.post(new FormData(form), onSuccess, onError);
      evt.preventDefault();
    });
    var resetBtn = document.querySelector('.ad-form__reset');
    resetBtn.addEventListener('click', function(evt) {
      evt.preventDefault();
      form.reset();
      // add address value based on main pin
      var mainPin = document.querySelector('.map__pin--main');
      var address = document.querySelector('#address');
      address.value = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ', ' + Math.round(mainPin.offsetTop + mainPin.offsetHeight + 22);
    });
    function onError(message) {
      var frag = document.createDocumentFragment();
      var temp = document.querySelector('#error').content;
      var errorMsg = temp.cloneNode(true);
      frag.appendChild(errorMsg);
      // can't add event listeners straight to cloned node for some reason
      // need to append it first
      var newMsg = frag.querySelector('.error');
      // event listeners to close message
      newMsg.addEventListener("click", onMouseClick);
      document.addEventListener("keydown", onEscPress);

      var main = document.querySelector('main');
      main.appendChild(frag);

      function onMouseClick(evt) {
        newMsg.remove();
        document.removeEventListener("keydown", onEscPress);
      }
      function onEscPress(evt) {
        if (evt.keyCode === 27) newMsg.remove();
        document.removeEventListener("keydown", onEscPress);
      }
    };
    function onSuccess(message) {
      // reset page to inactive state
      window.util.resetPage();
      var frag = document.createDocumentFragment();
      var temp = document.querySelector('#success').content;
      var successMsg = temp.cloneNode(true);
      frag.appendChild(successMsg);
      // can't add event listeners straight to cloned node for some reason
      // need to append it first
      var newMsg = frag.querySelector('.success');
      // event listeners to close message
      newMsg.addEventListener("click", onMouseClick);
      document.addEventListener("keydown", onEscPress);

      var main = document.querySelector('main');
      main.appendChild(frag);
      function onMouseClick(evt) {
        newMsg.remove();
        document.removeEventListener("keydown", onEscPress);
      }
      function onEscPress(evt) {
        if (evt.keyCode === 27) newMsg.remove();
        document.removeEventListener("keydown", onEscPress);
      }
    };
  }
})();
