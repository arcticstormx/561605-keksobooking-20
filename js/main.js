(function() {
"use strict";

// MOCK DATA
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
var MAP_HEADER_HEIGHT = 130;
var MAP_WIDTH = document.querySelector(".map__pins").clientWidth;
var MAP_HEIGHT = document.querySelector(".map__pins").clientHeight;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;


// UTILITY Functions

// generate a random number width specified minimum and maximum limits
  function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// get random element from a specified array
  function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
// shuffle a specified array
  function shuffleArray(arr) {
  return arr.sort(function() { return Math.random() - 0.5 });
};
// generate array with specified length from random elements of a specified array
  function generateRandomLengthArray(arr, randomLength) {
  var newArr = [];
  for (var i = 0; i < randomLength - 1; i++) {
    newArr.push(getRandomElement(arr));
  }
  return newArr;
};
// generate array with number sequence as elements
  function generateNumberArray(startNum, endNum) {
  var arr = [];
  for (var i = 0; i <= endNum; i++) {
    arr.push(i);
  }
  return arr;
};

// MODULES

// create and render adverts and pins
var renderPins = function() {
  // EXECUTED CODE

  // declare adverts array variable
  var adverts = createRandomAdvertsArray(8);

  // put map pins on map
  renderMapPins(adverts);

  // render a card
  renderCard(adverts[0]);

  // FUNCTIONS
  // generate random advert object
  function generateAdvert(id) {
    var xAddress = generateRandomNumber(MAP_PIN_WIDTH / 2, MAP_WIDTH - (MAP_PIN_WIDTH / 2));
    var yAddress = generateRandomNumber(MAP_HEADER_HEIGHT, MAP_HEIGHT);
    var advert = {
      "author": {
          "avatar": "img/avatars/user0" + id + ".png"
      },
      "offer": {
          "title": getRandomElement(TITLES),
          "address": xAddress + ", " + yAddress,
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
          "x": xAddress - 25,
          "y": yAddress - 70
      }
    };
    return advert;
  };
  // create adverts array from generated adverts
  function createRandomAdvertsArray(arrLength) {
    var arr = [];
    for (var i = 0; i < arrLength; i++) {
      arr.push(generateAdvert([i + 1]));
    }
    return arr;
  }
  // create map pin DOM element
  function createPin(advert) {
    var btn = document.querySelector("#pin")
      .content
      .querySelector("button")
      .cloneNode(true);
    var avatar = btn.querySelector("img");
    btn.style.left = advert.location.x + "px";
    btn.style.top = advert.location.y + "px";
    avatar.src = advert.author.avatar;
    avatar.alt = advert.offer.title;
    return btn;
  };
  // render map pins DOM elements on map from array
  function renderMapPins(arr) {
    var fragment = document.createDocumentFragment();
    var mapPins = document.querySelector(".map__pins");
    arr.forEach(function (el) {
      // create pin DOM element with object data
      var pin = createPin(el);
      // append DOM element to frag
      fragment.appendChild(pin);
    });
    // put pin DOM elements on map
    mapPins.appendChild(fragment);
  }
  // create card DOM element from object
  function createCard(advert) {
    var cardTemplate = document.querySelector("#card").content;
    var card = cardTemplate.querySelector("article").cloneNode(true);

    var title = card.querySelector(".popup__title");
    var address = card.querySelector(".popup__text--address");
    var price = card.querySelector(".popup__text--price");
    var type = card.querySelector(".popup__type");
    var capacity = card.querySelector(".popup__text--capacity");
    var time = card.querySelector(".popup__text--time");
    var utilities = card.querySelector(".popup__features");
    var description = card.querySelector(".popup__description");
    var photos = card.querySelector(".popup__photos");
    var photo = photos.querySelector("img");
    var avatar = card.querySelector(".popup__avatar");

    title.textContent = advert.offer.title;
    address.textContent = advert.offer.address;
    price.textContent = advert.offer.price + "₽/ночь";
    switch (advert.offer.type) {
      case "flat":
        type.textContent = "Квартира";
        break;
      case "bungalo":
        type.textContent = "Бунгало";
        break;
      case "house":
        type.textContent = "Дом";
        break;
      case "palace":
        type.textContent = "Дворец";
        break;
    }
    capacity.textContent = advert.offer.rooms + " комнаты для " + advert.offer.guests + " гостей";
    time.textContent = "Заезд после " + advert.offer.checkin + ", выезд до " + advert.offer.checkout;
    utilities.textContent = advert.offer.features.join(", ");
    description.textContent = advert.offer.description;
    avatar.src = advert.author.avatar;
    advert.offer.photos.forEach(function(el) {
      var newPhoto = photo.cloneNode(false);
      newPhoto.src = el;
      photos.appendChild(newPhoto);
    });
    photo.remove();

    return card;
  };
  // render card DOM element on map
  function renderCard(advert) {
    var card = createCard(advert);
    var fragment = document.createDocumentFragment();
    var map = document.querySelector(".map");
    var mapFilters = map.querySelector(".map__filters-container");

    fragment.appendChild(card);

    map.insertBefore(fragment, mapFilters);
  }
}

// change page settings at start
var startupSettings = function() {
  var adForm = document.querySelector(".ad-form");
  var filtersForm = document.querySelector(".map__filters");
  var adFieldsets = adForm.children;
  var filters = filtersForm.children;

  // disable all elements in collection/array/list
  var toggleDisableElements = function(iterableElements, boolean) {
    for (var i = 0; i < iterableElements.length; i++) {
      iterableElements[i].disabled = boolean;
    }
  }
  // disable map filters
  toggleDisableElements(filters, true);
  // disable ad form
  toggleDisableElements(adFieldsets, true);

  // value адреса в неактивном состоянии
  var mainPin = document.querySelector(".map__pin--main");
  var address = document.querySelector("#address");

  // первоначальное значение address, когда кнопка круглая
  address.value = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ", " + Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);
  // активация страницы
  var onMainPinClick = function(evt) {
    var map = document.querySelector(".map");
    map.classList.remove("map--faded");

    // enable map filters
    toggleDisableElements(filters, false);
    // enable ad form
    toggleDisableElements(adFieldsets, false);

    adForm.classList.remove("ad-form--disabled");
    // перенос адреса на остреё пина
    address.value = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ", " + Math.round(mainPin.offsetTop + mainPin.offsetHeight + 22);
  }

  // слушатели главного пина
  var mainPin = document.querySelector(".map__pin--main");
  mainPin.addEventListener("mousedown", function(evt) {
    if (evt.button !== 0) return;
    var mapFaded = document.querySelector(".map--faded");
    if (mapFaded) renderPins();
    onMainPinClick(evt);
  });

  mainPin.addEventListener("keydown", function(evt) {
    if (evt.keyCode !== 13) return;
    var mapFaded = document.querySelector(".map--faded");
    if (mapFaded) renderPins();
    onMainPinClick(evt);
  });
}

startupSettings();

// validate that guests number conforms to rooms capacity
var roomsToCapacityValidation = function() {
  // валидация соответствия количества комнат количеству гостей

  var roomNumber = document.querySelector("#room_number");
  var capacity = document.querySelector("#capacity");

  var enableCapacityOptions = function() {
    var capacityOptions = document.querySelectorAll("#capacity option");
    capacityOptions.forEach(function(el) {
      el.disabled = false;
    })
  }

  roomNumber.addEventListener("change", function(evt) {
    enableCapacityOptions();
    var roomsValue = evt.target.value;
    var capacityOptions = capacity.querySelectorAll("option");
    var oneGuestCapacity = capacity.querySelector("option[value='1']");
    capacityOptions.forEach(function(el) {
      if (roomsValue == "100") {
        if (el.value == "0") {
          el.selected = true;
          return;
        }
        el.disabled = true;


      } else if (roomsValue == "1") {
        if (el.value == "1") {
          oneGuestCapacity.selected = true;
          return;
        }
        el.disabled = true;

      } else if (roomsValue == "2") {
        if (el.value == "1" || el.value == "2") {
          oneGuestCapacity.selected = true;
          return;
        }
        el.disabled = true;


      } else if (roomsValue == "3") {
        if (el.value == "1" || el.value == "2" || el.value == "3") {
          oneGuestCapacity.selected = true;
          return;
        }
        el.disabled = true;
      }
    });
  });
}

roomsToCapacityValidation();

// open


})();
