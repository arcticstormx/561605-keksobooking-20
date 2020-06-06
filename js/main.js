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
var map = document.querySelector(".map");

var generateRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var getRandomElement = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
var shuffleArray = function(array) {
  array.sort(() => Math.random() - 0.5);
}
var generateAdvert = function() {
  var template = {
    "author": {
        "avatar": `img/avatars/user0${generateRandomNumber(0, 8)}.png`
    },
    "offer": {
        "title": getRandomElement(TITLES),
        "address": "600, 350",
        "price": generateRandomNumber(1000, 1000000),
        "type": getRandomElement(["palace", "flat", "house", "bungalo"]),
        "rooms": generateRandomNumber(1, 5),
        "guests": generateRandomNumber(1, 4),
        "checkin": getRandomElement("12:00", "13:00", "14:00"),
        "checkout": getRandomElement("12:00", "13:00", "14:00"),
        "features": shuffleArray(["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"]).splice(0, generateRandomNumber(0, 5)),
        "description": null,
        "photos": shuffleArray(["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"])
    },
    "location": {
        "x": generateRandomNumber(0, 300),
        "y": generateRandomNumber(130, 630)
    }
  }
};

















map.classList.remove("map--faded");
