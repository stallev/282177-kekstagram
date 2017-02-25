'use strict';
window.showGallery = (function () {
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;

  var overlay = document.querySelector('.gallery-overlay');
  var closeButton = document.querySelector('.gallery-overlay-close');
  var previewImage = document.querySelector('.gallery-overlay-image');
  var previewLikesCount = document.querySelector('.likes-count');
  var previewCommentsCount = document.querySelector('.comments-count');

  function close() {
    overlay.classList.add('invisible');
  }

  function onClose() {
    close();
  }

  function onKeyClose() {
    if (event.keyCode && event.keyCode === ENTER_KEY_CODE) {
      close();
    }
  }

  function onCloseByEscape() {
    if (event.keyCode && event.keyCode === ESC_KEY_CODE) {
      close();
    }
  }

  closeButton.addEventListener('click', onClose);
  closeButton.addEventListener('keydown', onKeyClose);
  document.addEventListener('keydown', onCloseByEscape);

  return function (element) {
    overlay.classList.remove('invisible');
    closeButton.focus();

    previewImage.src = element.url;
    previewCommentsCount.innerHTML = element.comments.length;
    previewLikesCount.innerHTML = element.likes;
  };
})();
