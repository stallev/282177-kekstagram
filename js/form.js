'use strict';
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.getElementById('upload-select-image');
var uploadFile = document.querySelector('.upload-file');
var buttonCloseModal = document.querySelector('.upload-form-cancel');
var scaleControls = document.querySelector('.upload-resize-controls');
var filters = document.querySelectorAll('.upload-filter-preview');
var originalFilter = filters[0];

// default values
var imageSizeValue = 100;
var imageSizeStep = 25;

var ESC_KEY_CODE = 27;

uploadOverlay.classList.add('invisible');
uploadSelectImage.classList.remove('invisible');
uploadFile.addEventListener('click', onOpen);
uploadFile.addEventListener('keydown', onOpenByEnter);
buttonCloseModal.addEventListener('click', onClose);
document.addEventListener('keydown', onCloseByEscape);

(window.initializeScale(scaleControls, imageSizeStep, imageSizeValue))();

function onOpen() {
  event.preventDefault();
  open();
}

function onOpenByEnter(event) {
  if (window.initializeFilters.isEnterKey(event)) {
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
  window.initializeFilters.changeInputChecked(originalFilter);
}


function onClose() {
  close();
  // deleting unnessesary styles
  window.initializeFilters.deleteFilter();
  window.initializeScale.resizeImage(1);
}

function onCloseByEscape(event) {
  if (isEscapeKey(event)) {
    close();
    // deleting unnessesary styles
    window.initializeFilters.deleteFilter();
    window.initializeScale.resizeImage(1);
  }
}

function isEscapeKey(evt) {
  return (evt.keyCode && evt.keyCode === ESC_KEY_CODE);
}
