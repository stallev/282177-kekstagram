'use strict';
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.getElementById('upload-select-image');
var uploadFile = document.querySelector('.upload-file');

var buttonCloseModal = document.querySelector('.upload-form-cancel');

var image = document.querySelector('.upload-form-preview > img');

var scaleControls = document.querySelector('.upload-resize-controls');
var imageSize = document.querySelector('.upload-resize-controls-value');
var filterButtons = document.querySelectorAll('input[name = "upload-filter"]');
var filters = document.querySelectorAll('.upload-filter-preview');
var originalFilter = filters[0];

// default values
var imageSizeValue = 100;
var imageSizeStep = 25;

var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;

uploadOverlay.classList.add('invisible');
uploadSelectImage.classList.remove('invisible');
uploadFile.addEventListener('click', onOpen);
uploadFile.addEventListener('keydown', onOpenByEnter);
buttonCloseModal.addEventListener('click', onClose);
document.addEventListener('keydown', onCloseByEscape);

window.initializeFilters();
window.initializeScale(scaleControls, imageSizeStep, imageSizeValue);

function resizeImage(size) {
  image.style.transform = 'scale(' + size + ')';
  image.style.webkitTransform = 'scale(' + size + ')';
  imageSize.value = size * 100 + '%';
}

function onOpen() {
  event.preventDefault();
  open();
}

function onOpenByEnter(event) {
  if (isEnterKey(event)) {
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
  changeInputChecked(originalFilter);
}

function changeInputChecked(target) {
  for (var i = 0; i < filters.length; i++) {
    var targetRadioInput = filters[i].parentNode.previousElementSibling;
    if (targetRadioInput.hasAttribute('checked')) {
      targetRadioInput.removeAttribute('checked');
    }
  }
  target.parentNode.previousElementSibling.setAttribute('checked', 'true');
}

function deleteFilter() {
  for (var i = 0; i < filterButtons.length; i++) {
    image.classList.remove('filter-' + filterButtons[i].value);
  }
}

function onClose() {
  close();
  // deleting unnessesary styles
  deleteFilter();
  resizeImage(1);
}

function onCloseByEscape(event) {
  if (isEscapeKey(event)) {
    close();
    // deleting unnessesary styles
    deleteFilter();
    resizeImage(1);
  }
}

function isEnterKey(evt) {
  return (evt.keyCode && evt.keyCode === ENTER_KEY_CODE);
}

function isEscapeKey(evt) {
  return (evt.keyCode && evt.keyCode === ESC_KEY_CODE);
}
