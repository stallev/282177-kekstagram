'use strict';

window.initializeScale = (function () {

  return function (element, step, imageSizeValue, resizeImage) {
    var increasingScaleButton = element.querySelector('.upload-resize-controls-button-inc');
    var decreasingScaleButton = element.querySelector('.upload-resize-controls-button-dec');

    var minImageSize = 25;
    var maxImageSize = 100;

    decreasingScaleButton.addEventListener('click', decreaseScale);
    increasingScaleButton.addEventListener('click', increaseScale);

    function increaseScale() {
      if (imageSizeValue < maxImageSize) {
        imageSizeValue += step;
        resizeImage(imageSizeValue / 100);
      }
    }

    function decreaseScale() {
      if (imageSizeValue > minImageSize) {
        imageSizeValue -= step;
        resizeImage(imageSizeValue / 100);
      }
    }
  };
})();
