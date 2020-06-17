'use strict';
(function () {

  window.data = {
    TITLES: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    PLACES: ['palace', 'flat', 'house', 'bungalo'],
    TIMES: ['12:00', '13:00', '14:00'],
    UTILITIES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    // generate advert
    generateAdvert: function generateAdvert(id) {
      var xAddress = window.util.generateRandomNumber(window.util.MAP_PIN_WIDTH / 2, window.util.MAP_WIDTH - (window.util.MAP_PIN_WIDTH / 2));
      var yAddress = window.util.generateRandomNumber(window.util.MAP_HEADER_HEIGHT, window.util.MAP_HEIGHT);
      var time = window.util.getRandomElement(window.data.TIMES);
      var advert = {
        'author': {
          'avatar': 'img/avatars/user0' + id + '.png'
        },
        'offer': {
          'title': window.util.getRandomElement(window.data.TITLES),
          'address': xAddress + ', ' + yAddress,
          'price': window.util.generateRandomNumber(1000, 1000000),
          'type': window.util.getRandomElement(window.data.PLACES),
          'rooms': window.util.generateRandomNumber(1, 5),
          'guests': window.util.generateRandomNumber(1, 4),
          'checkin': time,
          'checkout': time,
          'features': window.util.shuffleArray(window.data.UTILITIES).splice(0, window.util.generateRandomNumber(0, 5)),
          'description': null,
          'photos': window.util.generateRandomLengthArray(window.data.PHOTOS, window.util.generateRandomNumber(0, 10))
        },
        'location': {
          'x': xAddress,
          'y': yAddress
        }
      };
      return advert;
    },
    // create adverts array from generated adverts
    createRandomAdvertsArray: function createRandomAdvertsArray(arrLength) {
      var arr = [];
      for (var i = 0; i < arrLength; i++) {
        arr.push(this.generateAdvert([i + 1]));
      }
      return arr;
    }
  };
})();
