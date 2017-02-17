'use strict';
(function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadSelectImage = document.getElementById('upload-select-image');
  var uploadFile = document.querySelector('.upload-file');
  var buttonCloseModal = document.querySelector('.upload-form-cancel');
  var scaleControls = document.querySelector('.upload-resize-controls');
  // default values
  var imageSizeValue = 100;
  var imageSizeStep = 25;

  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
  uploadFile.addEventListener('click', onOpen);
  uploadFile.addEventListener('keydown', onOpenByEnter);
  buttonCloseModal.addEventListener('click', onClose);
  document.addEventListener('keydown', onCloseByEscape);

  window.initializeScale(scaleControls, imageSizeStep, imageSizeValue);

  function onOpen(event) {
    event.preventDefault();
    open();
  }

  function onOpenByEnter(event) {
    if (event.keyCode && event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      open();
    }
  }

  function open() {
    uploadOverlay.classList.remove('invisible');
    uploadSelectImage.classList.add('invisible');
  }

  function close() {
    uploadOverlay.classList.add('invisible');
    uploadSelectImage.classList.remove('invisible');
  }

  function onClose(event) {
    event.preventDefault();
    close();
  }

  function onCloseByEscape(event) {
    if (event.keyCode && event.keyCode === ESC_KEY_CODE) {
      close();
    }
  }
})();
