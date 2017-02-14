'use strict';
window.initializeScale = function (image, minifyImage, maxifyImage, realSize, maxSize, minSize, sizeStep, imageSize) {

  minifyImage.addEventListener('click', decreaseScale);
  maxifyImage.addEventListener('click', increaseScale);

  function increaseScale() {
    if (realSize < maxSize) {
      realSize += sizeStep;
      resizeImage(realSize / 100);
    }
  }

  function decreaseScale() {
    if (realSize > minSize) {
      realSize -= sizeStep;
      resizeImage(realSize / 100);
    }
  }

  function resizeImage(size) {
    image.style.transform = 'scale(' + size + ')';
    image.style.webkitTransform = 'scale(' + size + ')';
    imageSize.value = size * 100 + '%';
  }
};
