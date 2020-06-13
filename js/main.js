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

// UTILITY Functions
var generateRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
var getRandomElement = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
var shuffleArray = function(arr) {
  return arr.sort(function() { return Math.random() - 0.5 });
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

// Create advert
var generateAdvert = function(id) {
  var advert = {
    "author": {
        "avatar": "img/avatars/user0" + id + ".png"
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

// Create pin
var createPin = function(advert) {
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

// create mock adverts and add pins on map
var map = document.querySelector(".map");
var mapPins = document.querySelector(".map__pins");

var adverts = [];
var fragment = document.createDocumentFragment();

for (var i = 0; i < 8; i++) {
  adverts.push(generateAdvert([i + 1]));
}

adverts.forEach(function (el) {
  var pin = createPin(el);
  fragment.appendChild(pin);
});

// mapPins.appendChild(fragment);

//// create mock cards
var map = document.querySelector(".map");
var mapFilters = map.querySelector(".map__filters-container");
var cardTemplate = document.querySelector("#card").content;
var cardFrag = document.createDocumentFragment();

var createCard = function(advert) {
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

// var card = createCard(adverts[0]);

// cardFrag.appendChild(card);

// map.insertBefore(cardFrag, mapFilters);



// 4 глава Обработка событий

var adForm = document.querySelector(".ad-form");
var adFieldsets = adForm.children;
var filtersForm = document.querySelector(".map__filters");
var filters = filtersForm.children;

// отключение всех филдсетов в ad-form
for (var i = 0; i < adFieldsets.length; i++) {
  adFieldsets[i].disabled = true;
}

// отключение всех инпутов в фильтрах
for (var i = 0; i < filters.length; i++) {
  filters[i].disabled = true;
}

// value адреса в неактивном состоянии
var mainPin = document.querySelector(".map__pin--main");
var address = document.querySelector("#address");

// первоначальное значение address, когда кнопка круглая
address.value = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ", " + Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);

// активация страницы

var onMainPinClick = function(evt) {
  map.classList.remove("map--faded");
  for (var i = 0; i < filters.length; i++) {
    filters[i].disabled = false;
  }
  for (var i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].disabled = false;
  }
  adForm.classList.remove("ad-form--disabled");
  // перенос адреса на остреё пина
  address.value = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ", " + Math.round(mainPin.offsetTop + mainPin.offsetHeight + 22);
}

// слушатели главного пина
mainPin.addEventListener("mousedown", function(evt) {
  if (evt.button !== 0) return;
  onMainPinClick(evt);
});

mainPin.addEventListener("keydown", function(evt) {
  if (evt.keyCode !== 13) return;
  onMainPinClick(evt);
});

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

})();
