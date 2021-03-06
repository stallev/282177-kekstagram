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

  function onCloseButtonClick() {
    close();
  }

  function onCloseKeydownEnter(event) {
    if (window.helpers.isEnterKey(event)) {
      close();
    }
  }

  function onCloseKeydownEscape(event) {
    if (window.helpers.isEscapeKey(event)) {
      close();
    }
  }
  return function (element) {
    overlay.classList.remove('invisible');
    closeButton.focus();

    closeButton.addEventListener('click', onCloseButtonClick);
    closeButton.addEventListener('keydown', onCloseKeydownEnter);
    document.addEventListener('keydown', onCloseKeydownEscape);

    previewImage.src = element.url;
    previewCommentsCount.innerHTML = element.comments.length;
    previewLikesCount.innerHTML = element.likes;
  };
})();
