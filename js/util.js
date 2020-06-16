(function(){
  'use strict';
  window.util = {
    MAP_HEADER_HEIGHT: 130,
    MAP_WIDTH: document.querySelector(".map__pins").clientWidth,
    MAP_HEIGHT: document.querySelector(".map__pins").clientHeight,
    MAP_PIN_WIDTH: 50,
    MAP_PIN_HEIGHT: 70,
    CARD_WIDTH: 230,
    FILTERS_HEIGHT: 46,
    // generate a random number width specified minimum and maximum limits
    generateRandomNumber: function generateRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min); },
    // get random array element
    getRandomElement: function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)]; },
    // shuffle a specified array
    shuffleArray: function shuffleArray(arr) {return arr.sort(function() {
      return Math.random() - 0.5 }); },
    // generate array with specified length from random elements of a specified array
    generateRandomLengthArray: function generateRandomLengthArray(arr, randomLength) {
      var newArr = []; for (var i = 0; i < randomLength - 1; i++) {newArr.push(this.getRandomElement(arr)); } return newArr },
    // generate array with number sequence
    generateNumberArray: function generateNumberArray(startNum, endNum) {
      var arr = []; for (var i = 0; i <= endNum; i++) {arr.push(i); } return arr; }

  }
})()
