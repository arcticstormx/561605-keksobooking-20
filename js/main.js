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
var CARD_WIDTH = 230;
var FILTERS_HEIGHT = 46;


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
          "x": xAddress,
          "y": yAddress
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
    btn.style.left = advert.location.x - 25 + "px";
    btn.style.top = advert.location.y - 70 + "px";
    avatar.src = advert.author.avatar;
    avatar.alt = advert.offer.title;
    return btn;
  };
  // click handler for map pins (not Main Pin)
  function onMapPinClick(evt) {
    // 1. find pin's advert
    var pinAvatarSrc = evt.currentTarget.querySelector("img").src;
    // edit src into "user##" format where "##" are numbers
    var pinUserId = pinAvatarSrc.match(/user\w+(?=.png)/)[0];
    // find an advert with the same user id as pin's
    var pinAdvert = adverts.find(function(item) {
      var advertUserId = item.author.avatar.match(/user\w+(?=.png)/)[0];
      return advertUserId === pinUserId;
    });
    // 2. create pin's card DOM element
    var card = createCard(pinAdvert);
    // 3. render pin's card DOM element
    renderCard(card);
  }

  // render map pins DOM elements on map from array
  function renderMapPins(arr) {
    var fragment = document.createDocumentFragment();
    var mapPins = document.querySelector(".map__pins");
    arr.forEach(function (el) {
      // create pin DOM element with object data
      var pin = createPin(el);
      // add pin click handler
      pin.addEventListener("click", onMapPinClick);
      pin.addEventListener("keydown", function(evt) {
        if (evt.keyCode !== 13) return;
        onMapPinClick(evt);
      });

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
    var closeBtn = card.querySelector(".popup__close");

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

    // append photos to DOM element
    advert.offer.photos.forEach(function(photoSrc) {
      var newPhoto = photo.cloneNode(false);
      newPhoto.src = photoSrc;
      photos.appendChild(newPhoto);
    });
    // delete template photo
    photo.remove();

    // height of each card depends on it's data
    // to get the correct height we need to
    // mock render card with hidden visibility
    var findRenderedCardHeight = function(card) {
      var map = document.querySelector(".map");
      card.style.visibility = "hidden";
      map.appendChild(card);
      var cardHeight = card.offsetHeight;
      card.remove();
      card.style.visibility = "visible";
      return cardHeight;
    }

    // set card's X and Y coordinates and prevent X and Y overflow
    var setCardLocation = function(card) {
      // get rendered card height
      var cardHeight = findRenderedCardHeight(card);
      // find if card overflows in X coordinate
      if (advert.location.x + CARD_WIDTH > MAP_WIDTH) {
        card.style.left = advert.location.x + (MAP_WIDTH - (advert.location.x + CARD_WIDTH)) + "px";
      } else {
        card.style.left = advert.location.x + "px";
      }
      // find if card overflows in Y coordinate
      if (advert.location.y + cardHeight > MAP_HEIGHT - FILTERS_HEIGHT) {
        card.style.top = advert.location.y + (MAP_HEIGHT - (advert.location.y + cardHeight)) + "px";
      } else {
        card.style.top = advert.location.y + "px";
      }
      return card;
    }

    // set style.left and style.top
    card = setCardLocation(card);

    // remove card from DOM on "close button" click
    closeBtn.addEventListener("click", function() {
      card.remove();
    });
    // remove card from DOM on "escape" press
    document.addEventListener("keydown", function(evt) {
      if (evt.keyCode !== 27) return;
      card.remove();
    });

    return card;
  };
  // render card DOM element on map
  function renderCard(createdCard) {
    var map = document.querySelector(".map");
    var mapFilters = map.querySelector(".map__filters-container");
    // find other opened popup (if any)
    var otherCard = map.querySelector(".popup")
    // remove other card from DOM (if it exists)
    if (otherCard) otherCard.remove();
    // insert card DOM element before mapFilters
    map.insertBefore(createdCard, mapFilters);
  }
}

// change inactive page settings at start
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

var validation = function() {
  // EXECUTED CODE
  roomsToCapacityValidation();
  typeToPriceValidation();

  // validate that guests number conforms to rooms capacity
  function roomsToCapacityValidation() {
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
  // validate apartments type to price
  function typeToPriceValidation() {
    var type = document.querySelector("#type");
    var price = document.querySelector("#price");

    type.addEventListener("change", function(evt) {
      switch (evt.target.value) {
        case "bungalo":
          price.min = 0;
          price.placeholder = "0";
          break;
        case "flat":
          price.min = 1000;
          price.placeholder = "1000";
          break;
        case "house":
          price.min = 5000;
          price.placeholder = "5000";
          break;
        case "palace":
          price.min = 10000;
          price.placeholder = "10000";
          break;
      }
    });
  }
}
validation();

})();
