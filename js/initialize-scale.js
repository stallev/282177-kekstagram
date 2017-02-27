'use strict';

window.initializeScale = (function () {
  return function (element, step, imageSizeValue, callback) {
    var buttonScaleIncreasing = element.querySelector('.upload-resize-controls-button-inc');
    var buttonScaleDecreasing = element.querySelector('.upload-resize-controls-button-dec');
    var imageSize = document.querySelector('.upload-resize-controls-value');

    var minImageSize = 25;
    var maxImageSize = 100;

    buttonScaleDecreasing.addEventListener('click', decreaseScale);
    buttonScaleIncreasing.addEventListener('click', increaseScale);

    function increaseScale() {
      if (imageSizeValue < maxImageSize) {
        imageSizeValue += step;
        if (typeof callback === 'function') {
          callback(imageSizeValue);
        }
        imageSize.value = imageSizeValue + '%';
      }
    }

    function decreaseScale() {
      if (imageSizeValue > minImageSize) {
        imageSizeValue -= step;
        if (typeof callback === 'function') {
          callback(imageSizeValue);
        }
        imageSize.value = imageSizeValue + '%';
      }
    }
  };
})();
