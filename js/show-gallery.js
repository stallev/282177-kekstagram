'use strict';

window.showGallery = (function () {

  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;

  return function (element) {
    var gallery = {
      overlay: document.querySelector('.gallery-overlay'),
      closeButton: document.querySelector('.gallery-overlay-close'),
      preview: document.querySelector('.gallery-overlay-preview'),
      previewImage: document.querySelector('.gallery-overlay-image'),
      previewLikesCount: document.querySelector('.likes-count'),
      previewCommentsCount: document.querySelector('.comments-count'),
      close: function () {
        gallery.overlay.classList.add('invisible');
      },
      onClose: function () {
        gallery.close();
      },
      onKeyClose: function (event) {
        if (event.keyCode && event.keyCode === ENTER_KEY_CODE) {
          gallery.close();
        }
      },
      onCloseByEscape: function (event) {
        if (event.keyCode && event.keyCode === ESC_KEY_CODE) {
          gallery.close();
        }
      }
    };

    gallery.overlay.classList.remove('invisible');
    gallery.closeButton.focus();

    gallery.previewImage.src = element.url;
    gallery.previewCommentsCount.innerHTML = element.comments.length;
    gallery.previewLikesCount.innerHTML = element.likes;

    gallery.closeButton.addEventListener('click', gallery.onClose);
    gallery.closeButton.addEventListener('keydown', gallery.onKeyClose);
    document.addEventListener('keydown', gallery.onCloseByEscape);
  };
})();
