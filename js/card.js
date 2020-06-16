(function(){
  'use strict';
  window.card = {
  // create card DOM element from object
  createFrom: function createFrom(advert) {
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

    // append photos to card element
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
      if (advert.location.x + window.util.CARD_WIDTH > window.util.MAP_WIDTH) {
        card.style.left = advert.location.x + (window.util.MAP_WIDTH - (advert.location.x + window.util.CARD_WIDTH)) + "px";
      } else {
        card.style.left = advert.location.x + "px";
      }
      // find if card overflows in Y coordinate
      if (advert.location.y + cardHeight > window.util.MAP_HEIGHT - window.util.FILTERS_HEIGHT) {
        card.style.top = advert.location.y + (window.util.MAP_HEIGHT - (advert.location.y + cardHeight)) + "px";
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
  }
  };
})();
