'use strict';
(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var address = document.querySelector('#address');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      // restrict X coordinates movement
      if (mainPin.offsetLeft - shift.x >= -mainPin.offsetWidth / 2 && mainPin.offsetLeft - shift.x < mapPins.offsetWidth - mainPin.offsetWidth / 2 + 2 ) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      // restrict Y coordinates movement
      if (mainPin.offsetTop - shift.y >= 130 && mainPin.offsetTop - shift.y < 630) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }
      // put new address value every time we move pin
      address.value = Math.round(mainPin.offsetLeft + mainPin.offsetWidth / 2) + ', ' + Math.round(mainPin.offsetTop + mainPin.offsetHeight + 22);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault)
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
