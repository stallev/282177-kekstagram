'use strict';

window.initializeScale = (function () {
  return function (element) {
    var increasingScaleButton = element.querySelector('.upload-resize-controls-button-inc');
    var decreasingScaleButton = element.querySelector('.upload-resize-controls-button-dec');

    window.decreasingScale = function (callback) {
      decreasingScaleButton.addEventListener('click', callback);
    };

    window.increasingScale = function (callback) {
      increasingScaleButton.addEventListener('click', callback);
    };
  };
})();
