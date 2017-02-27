'use strict';

(function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var imageUploadingForm = document.getElementById('upload-select-image');
  var fileInput = document.querySelector('.upload-file');
  var buttonCloseModal = document.querySelector('.upload-form-cancel');
  var scaleControls = document.querySelector('.upload-resize-controls');
  var image = document.querySelector('.upload-form-preview > img');
  var filterLabels = document.querySelector('.upload-filter-controls');

  var imageSizeValue = 100;
  var imageSizeStep = 25;

  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  uploadOverlay.classList.add('invisible');
  imageUploadingForm.classList.remove('invisible');
  fileInput.addEventListener('click', onOpen);
  fileInput.addEventListener('keydown', onOpenByEnter);
  buttonCloseModal.addEventListener('click', onClose);
  document.addEventListener('keydown', onCloseByEscape);

  window.pictures();
  window.initializeFilters(filterLabels, applyFilter);
  window.initializeScale(scaleControls, imageSizeStep, imageSizeValue, applyScale);

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
    imageUploadingForm.classList.add('invisible');
  }

  function close() {
    uploadOverlay.classList.add('invisible');
    imageUploadingForm.classList.remove('invisible');
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

  function applyFilter(newFilter, oldFilter) {
    image.classList.remove('filter-' + oldFilter);
    image.classList.add('filter-' + newFilter);
  }

  function applyScale(size) {
    image.style.transform = 'scale(' + size + ')';
  }
})();
