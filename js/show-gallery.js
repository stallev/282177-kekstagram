'use strict';

window.showGallery = (function () {
  var overlay = document.querySelector('.gallery-overlay');
  var closeButton = overlay.querySelector('.gallery-overlay-close');
  var previewImage = overlay.querySelector('.gallery-overlay-image');
  var previewLikesCount = overlay.querySelector('.likes-count');
  var previewCommentsCount = overlay.querySelector('.comments-count');

  function close() {
    overlay.classList.add('invisible');
  }

  function onClose() {
    close();
  }

  function onKeyClose(event) {
    if (window.helpers.isEnterKey(event)) {
      close();
    }
  }

  function onCloseByEscape(event) {
    if (window.helpers.isEscapeKey(event)) {
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
