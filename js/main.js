(function() {
"use strict";

var TITLES = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];
var PLACES = ["palace", "flat", "house", "bungalo"];
var TIMES = ["12:00", "13:00", "14:00"];
var UTILITIES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var map = document.querySelector(".map");
var mapPins = document.querySelector(".map__pins");

var generateRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
var getRandomElement = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
var shuffleArray = function(arr) {
  return arr.sort(() => Math.random() - 0.5);
};
var generateRandomLengthArray = function(arr, randomLength) {
  var newArr = [];
  for (var i = 0; i < randomLength - 1; i++) {
    newArr.push(getRandomElement(arr));
  }
  return newArr;
};
var generateNumberArray = function(startNum, endNum) {
  var arr = [];
  for (var i = 0; i <= endNum; i++) {
    arr.push(i);
  }
  return arr;
};
var generateAdvert = function(id) {
  var advert = {
    "author": {
        "avatar": `img/avatars/user0${id}.png`
    },
    "offer": {
        "title": getRandomElement(TITLES),
        "address": "600, 350",
        "price": generateRandomNumber(1000, 1000000),
        "type": getRandomElement(PLACES),
        "rooms": generateRandomNumber(1, 5),
        "guests": generateRandomNumber(1, 4),
        "checkin": getRandomElement(TIMES),
        "checkout": getRandomElement(TIMES),
        "features": shuffleArray(UTILITIES).splice(0, generateRandomNumber(0, 5)),
        "description": null,
        "photos": generateRandomLengthArray(PHOTOS, generateRandomNumber(0, 10))
    },
    "location": {
        "x": generateRandomNumber(25, 1200) - 25,
        "y": generateRandomNumber(130, 630) - 70
    }
  };
  return advert;
};

var createPin = function(advert) {
  let btn = document.querySelector("#pin")
    .content
    .querySelector("button")
    .cloneNode(true);
  let avatar = btn.querySelector("img");
  btn.style.left = advert.location.x + "px";
  btn.style.top = advert.location.y + "px";
  avatar.src = advert.author.avatar;
  avatar.alt = advert.offer.title;
  return btn;
};

var adverts = [];
var fragment = document.createDocumentFragment();

for (let i = 0; i < 8; i++) {
  adverts.push(generateAdvert([i + 1]));
}

adverts.forEach(function (el) {
  var pin = createPin(el);
  fragment.appendChild(pin);
});

mapPins.appendChild(fragment);

map.classList.remove("map--faded");
})();
