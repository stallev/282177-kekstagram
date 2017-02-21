'use strict';

window.initializeScale = (function () {

  return function (element, step, imageSizeValue, callback) {
    var increasingScaleButton = element.querySelector('.upload-resize-controls-button-inc');
    var decreasingScaleButton = element.querySelector('.upload-resize-controls-button-dec');
    var imageSize = document.querySelector('.upload-resize-controls-value');

    var minImageSize = 25;
    var maxImageSize = 100;

    decreasingScaleButton.addEventListener('click', decreaseScale);
    increasingScaleButton.addEventListener('click', increaseScale);

    function increaseScale() {
      if (imageSizeValue < maxImageSize) {
        imageSizeValue += step;
        if (typeof callback === 'function') {
          callback(imageSizeValue / 100);
        }
        imageSize.value = imageSizeValue + '%';
      }
    }

    function decreaseScale() {
      if (imageSizeValue > minImageSize) {
        imageSizeValue -= step;
        if (typeof callback === 'function') {
          callback(imageSizeValue / 100);
        }
        imageSize.value = imageSizeValue + '%';
      }
    }
  };
})();
