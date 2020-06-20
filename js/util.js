'use strict';
(function () {
  window.util = {
    MAP_HEADER_HEIGHT: 130,
    MAP_WIDTH: document.querySelector('.map__pins').clientWidth,
    MAP_HEIGHT: document.querySelector('.map__pins').clientHeight,
    MAP_PIN_WIDTH: 50,
    MAP_PIN_HEIGHT: 70,
    CARD_WIDTH: 230,
    FILTERS_HEIGHT: 46,
    // generate a random number width specified minimum and maximum limits
    generateRandomNumber: function generateRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // get random array element
    getRandomElement: function getRandomElement(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    // shuffle a specified array
    shuffleArray: function shuffleArray(arr) {
      return arr.sort(function () {
        return Math.random() - 0.5;
      });
    },
    // generate array with specified length from random elements of a specified array
    generateRandomLengthArray: function generateRandomLengthArray(arr, randomLength) {
      var newArr = []; for (var i = 0; i < randomLength - 1; i++) {
        newArr.push(this.getRandomElement(arr));
      } return newArr;
    },
    // generate array with number sequence
    generateNumberArray: function generateNumberArray(startNum, endNum) {
      var arr = []; for (var i = 0; i <= endNum; i++) {
        arr.push(i);
      } return arr;
    },
    // reset page to inactive state
    resetPage: function resetPage() {
      var form = document.querySelector(".ad-form");
      var filtersForm = document.querySelector('.map__filters');
      var adFieldsets = form.children;
      var filters = filtersForm.children;
      // 1. reset form data
      form.reset();
      // 2. disable all inputs
      var toggleDisableElements = function (iterableElements, boolean) {
        for (var i = 0; i < iterableElements.length; i++) {
          iterableElements[i].disabled = boolean;
        }
      };
      // disable map filters
      toggleDisableElements(filters, true);
      // disable ad form
      toggleDisableElements(adFieldsets, true);
      // 3. delete map pins
      var map = document.querySelector('.map');
      var mapPins = map.querySelectorAll(".map__pin:not(.map__pin--main)");
      var mapCard = map.querySelector('.map__card');
      for (var i = 0; i < mapPins.length; i++) {
        mapPins[i].remove();
      }
      // 4. delete open card (if it exists)
      if (mapCard) mapCard.remove();
      // 5. add map--faded class to map
      map.classList.add('map--faded');
      // 6. add ad-form--disabled class to form
      form.classList.add('ad-form--disabled');
      // 7. add address value
      var mainPin = document.querySelector('.map__pin--main');
      var address = document.querySelector('#address');
      address.value = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ', ' + Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);
    }

  };
})();
