// module7-task1
//
// 1. Связать "активацию" фильтра с успешной загрузкой
// 2. Реализовать фильтрацию
  // 2.1 Создаём копию массива
  // 2.2 Каждый инпут фильтра фильтрует и меняет копию массива
  // 2.3 Таким образом, каждый инпут обновляет массив
  // 2.4 Всегда выводится 5 элементов, даже если в отфильтрованном массиве их меньше
  // 2.5 Если элементов в массиве меньше 5, то к нему пушатся элементы из первоначального массива
  // ?? Как избежать дублирования элементов?

  // + 1. Вынести в глобальную функцию startupsettings
  // 2. Вынести загрузку данных в main

'use strict';
(function () {
  window.map = {
    // change inactive page settings at start
    setPageStartupSettings: function () {
      var adForm = document.querySelector('.ad-form');
      var filtersForm = document.querySelector('.map__filters');
      var adFieldsets = adForm.children;
      var filters = filtersForm.children;


      // disable map filters
      toggleDisableElements(filters, true);
      // disable ad form
      toggleDisableElements(adFieldsets, true);

      // value адреса в неактивном состоянии
      var mainPin = document.querySelector('.map__pin--main');
      var address = document.querySelector('#address');

      // первоначальное значение address, когда кнопка круглая
      address.value = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ', ' + Math.round(mainPin.offsetTop + mainPin.offsetHeight / 2);

      // слушатели главного пина
      var mainPin = document.querySelector('.map__pin--main');
      mainPin.addEventListener('mousedown', onMainPinMouseDown);
      mainPin.addEventListener('keydown', onMainPinKeydown);
      // активация страницы
      function activatePage() {
        var map = document.querySelector('.map');
        var adForm = document.querySelector('.ad-form');
        map.classList.remove('map--faded');

        // enable map filters
        toggleDisableElements(filters, false);
        // enable ad form
        toggleDisableElements(adFieldsets, false);

        adForm.classList.remove('ad-form--disabled');
        mainPin.removeEventListener('mousedown', onMainPinKeydown);
        mainPin.removeEventListener('keydown', onMainPinMouseDown);
      };
      function onMainPinKeydown(evt) {
        if (evt.keyCode !== 13) {
          return;
        }
        var mapFaded = document.querySelector('.map--faded');
        if (mapFaded) {
          getAdvertsData();
        }
        activatePage();
      };
      function onMainPinMouseDown(evt) {
        if (evt.button !== 0) {
          return;
        }
        var mapFaded = document.querySelector('.map--faded');
        if (mapFaded) {
          getAdvertsData();
        }
        activatePage();
      };
    }
  };
  // FUNCTIONS
  // get adverts data object
  function getAdvertsData() {
    // EXECUTED CODE
    // declare adverts array variable
    var adverts;
    var onError = function (message) {
      console.error(message);
    };
    var onSuccess = function (data) {
      console.log(data);
      adverts = data;
      renderMapPins(adverts);
    };
    // load adverts data
    window.data.get('https://javascript.pages.academy/keksobooking/data', onSuccess, onError);
  }
  // disable all elements in collection/array/list
  function toggleDisableElements (iterableElements, boolean) {
    for (var i = 0; i < iterableElements.length; i++) {
      iterableElements[i].disabled = boolean;
    }
  };
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
  };
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
  };
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
  };
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
  };
})();
