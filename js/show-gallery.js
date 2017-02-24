'use strict';

window.showGallery = (function () {
  var gallery = document.querySelector('.gallery-overlay');
  var galleryCloseButton = document.querySelector('.gallery-overlay-close');
  var galleryPreview = document.querySelector('.gallery-overlay-preview');
  var galleryPreviewImage = document.querySelector('.gallery-overlay-image');
  var galleryPreviewLikesCount = galleryPreview.querySelector('.likes-count');
  var galleryPreviewCommentsCount = galleryPreview.querySelector('.comments-count');
  
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;
  
  return function (element) {
    gallery.classList.remove('invisible');
    galleryCloseButton.focus();
    
    galleryPreviewImage.src = element.url;
    galleryPreviewCommentsCount.innerHTML = element.comments.length;
    galleryPreviewLikesCount.innerHTML = element.likes;
    
        
    galleryCloseButton.addEventListener('click', onClose);
    galleryCloseButton.addEventListener('keydown', onKeyClose);
    document.addEventListener('keydown', onCloseByEscape);
    
    function onClose() {
      closeGallery();
    }
    
    function onKeyClose(event) {
      if(event.keyCode && event.keyCode === ENTER_KEY_CODE) {
        closeGallery();
      }
    }
    
    function closeGallery() {
      gallery.classList.add('invisible');
    }
  
    function onCloseByEscape(event) {
      if (event.keyCode && event.keyCode === ESC_KEY_CODE) {
        closeGallery();
      }
    }
  };
})();
