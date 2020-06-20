'use strict';
(function () {
  // create and render adverts and pins
  var renderPins = function () {
  // EXECUTED CODE
  // declare adverts array variable

    window.map = {
      renderMapPins: function renderMapPins(advertsArray) {
      var fragment = document.createDocumentFragment();
      var mapPins = document.querySelector('.map__pins');
      advertsArray.forEach(function (el) {
      // create pin DOM element with object data
        var pin = createPin(el);
        // add pin click handler
        pin.addEventListener('click', onMapPinClick);
        pin.addEventListener('keydown', function (evt) {
          if (evt.keyCode !== 13) {
            return;
          }
          onMapPinClick(evt);
        });

        // append DOM element to frag
        fragment.appendChild(pin);
      });
      // put pin DOM elements on map
      mapPins.appendChild(fragment);
    }
    };

    var adverts;
    var onError = function (message) {
      console.error(message);
    };
    var onSuccess = function (data) {
      console.log(data);
      adverts = data;
      renderMapPins(adverts);
    };
    window.load('https://javascript.pages.academy/keksobooking/data', onSuccess, onError);

    // var adverts = window.data.createRandomAdvertsArray(8);

    // put map pins on map

    // FUNCTIONS
    // create map pin DOM element
    function createPin(advert) {
      var btn = document.querySelector('#pin')
      .content
      .querySelector('button')
      .cloneNode(true);
      var avatar = btn.querySelector('img');
      btn.style.left = advert.location.x - 25 + 'px';
      btn.style.top = advert.location.y - 70 + 'px';
      avatar.src = advert.author.avatar;
      avatar.alt = advert.offer.title;
      return btn;
    }
    // click handler for map pins (not Main Pin)
    function onMapPinClick(evt) {
    // 1. find pin's advert
      var pinAvatarSrc = evt.currentTarget.querySelector('img').src;
      // edit src into "user##" format where "##" are numbers
      var pinUserId = pinAvatarSrc.match(/user\w+(?=.png)/);
      pinUserId ? pinUserId = pinAvatarSrc.match(/user\w+(?=.png)/)[0] : pinUserId = 'default';
      // find an advert with the same user id as pin's
      var pinAdvert = adverts.find(function (item) {
        var advertUserId = item.author.avatar.match(/\w+(?=.png)/);
        return advertUserId[0] === pinUserId;
      });
      // 2. create pin's card DOM element
      var card = window.card.createFrom(pinAdvert);
      // 3. render pin's card DOM element
      renderCard(card);
    }
    // render map pins DOM elements on map from array
    function renderMapPins(advertsArray) {
      var fragment = document.createDocumentFragment();
      var mapPins = document.querySelector('.map__pins');
      advertsArray.forEach(function (el) {
      // create pin DOM element with object data
        var pin = createPin(el);
        // add pin click handler
        pin.addEventListener('click', onMapPinClick);
        pin.addEventListener('keydown', function (evt) {
          if (evt.keyCode !== 13) {
            return;
          }
          onMapPinClick(evt);
        });

        // append DOM element to frag
        fragment.appendChild(pin);
      });
      // put pin DOM elements on map
      mapPins.appendChild(fragment);
    }
    // render card DOM element on map
    function renderCard(createdCard) {
      var map = document.querySelector('.map');
      var mapFilters = map.querySelector('.map__filters-container');
      // find other opened popup (if any)
      var openedCard = map.querySelector('.popup');
      // remove other card from DOM (if it exists)
      if (openedCard) {
        openedCard.remove();
      }
      // insert card DOM element before mapFilters
      map.insertBefore(createdCard, mapFilters);
    }
  };
  // change inactive page settings at start
  var startupSettings = function () {
    var adForm = document.querySelector('.ad-form');
    var filtersForm = document.querySelector('.map__filters');
    var adFieldsets = adForm.children;
    var filters = filtersForm.children;

    // disable all elements in collection/array/list
    var toggleDisableElements = function (iterableElements, boolean) {
      for (var i = 0; i < iterableElements.length; i++) {
        iterableElements[i].disabled = boolean;
      }
    };
    // disable map filters
    toggleDisableElements(filters, true);
    // disable ad form
    toggleDisableElements(adFieldsets, true);

    // value адреса в неактивном состоянии
    var mainPin = document.querySelector('.map__pin--main');
    var address = document.querySelector('#address');

    // первоначальное значение address, когда кнопка круглая
    address.value = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ', ' + Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);
    // активация страницы
    var onMainPinClick = function (evt) {
      var map = document.querySelector('.map');
      map.classList.remove('map--faded');

      // enable map filters
      toggleDisableElements(filters, false);
      // enable ad form
      toggleDisableElements(adFieldsets, false);

      adForm.classList.remove('ad-form--disabled');
      // перенос адреса на остреё пина
      address.value = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ', ' + Math.round(mainPin.offsetTop + mainPin.offsetHeight + 22);
    };

    // слушатели главного пина
    var mainPin = document.querySelector('.map__pin--main');
    mainPin.addEventListener('mousedown', function (evt) {
      if (evt.button !== 0) {
        return;
      }
      var mapFaded = document.querySelector('.map--faded');
      if (mapFaded) {
        renderPins();
      }
      onMainPinClick(evt);
    });

    mainPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode !== 13) {
        return;
      }
      var mapFaded = document.querySelector('.map--faded');
      if (mapFaded) {
        renderPins();
      }
      onMainPinClick(evt);
    });
  };

  startupSettings();
})();
