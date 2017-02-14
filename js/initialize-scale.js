'use strict';

window.initializeScale = function (element, step, imageSizeValue) {
  var imageSize = document.querySelector('.upload-resize-controls-value');
  var image = document.querySelector('.upload-form-preview > img');
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

  function resizeImage(size) {
    image.style.transform = 'scale(' + size + ')';
    image.style.webkitTransform = 'scale(' + size + ')';
    imageSize.value = size * 100 + '%';
  }
};
