'use strict';
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.getElementById('upload-select-image');
var uploadFile = document.querySelector('.upload-file');

var buttonCloseModal = document.querySelector('.upload-form-cancel');

var image = document.querySelector('.upload-form-preview > img');

var uploadForm = uploadOverlay.querySelector('form');

var filters = document.querySelectorAll('.upload-filter-preview');

var filterButtons = uploadForm.elements['upload-filter'];

var filterLabels = document.querySelector('.upload-filter-controls');
var increasingScaleButton = document.querySelector('.upload-resize-controls-button-inc');
var decreasingScaleButton = document.querySelector('.upload-resize-controls-button-dec');
var imageSize = document.querySelector('.upload-resize-controls-value');

// default values
var imageSizeValue = 100;
var imageSizeStep = 25;
var minImageSize = 25;
var maxImageSize = 100;

var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;

uploadOverlay.classList.add('invisible');
uploadSelectImage.classList.remove('invisible');
uploadFile.addEventListener('click', onOpen);
uploadFile.addEventListener('keydown', onOpenByEnter);
buttonCloseModal.addEventListener('click', onClose);
document.addEventListener('keydown', onCloseByEscape);
filterLabels.addEventListener('click', onSelectFilter);
filterLabels.addEventListener('keydown', onSelectFilterByEnter);
decreasingScaleButton.addEventListener('click', decreaseScale);
increasingScaleButton.addEventListener('click', increaseScale);

function toggleFilter(target) {
  deleteFilter();
  // make all attributes area-checked false
  deleteAreaChecked(filters);
  toggleAriaChecked(target);
  image.classList.add('filter-' + target.parentNode.previousElementSibling.value);
  changeInputChecked(target);
}

function deleteFilter() {
  for (var i = 0; i < filterButtons.length; i++) {
    image.classList.remove('filter-' + filterButtons[i].value);
  }
}

function deleteAreaChecked(array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('aria-checked', 'false');
  }
}

function toggleAriaChecked(element) {
  var pressed = (element.getAttribute('aria-checked') === 'true');
  element.setAttribute('aria-checked', !pressed);
}

function changeInputChecked(target) {
  target.parentNode.previousElementSibling.setAttribute('checked', 'true');
}

function increaseScale() {
  if (imageSizeValue < maxImageSize) {
    imageSizeValue += imageSizeStep;
    resizeImage(imageSizeValue / 100);
  }
}

function decreaseScale() {
  if (imageSizeValue > minImageSize) {
    imageSizeValue -= imageSizeStep;
    resizeImage(imageSizeValue / 100);
  }
}

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

function onSelectFilterByEnter(event) {
  if (isEnterKey(event)) {
    toggleFilter(event.target);
  }
}

function onSelectFilter(event) {
  event.preventDefault();
  if (!event.target.classList.contains('upload-filter-preview')) {
    return;
  }
  toggleFilter(event.target);
}

function isEnterKey(evt) {
  return (evt.keyCode && evt.keyCode === ENTER_KEY_CODE);
}

function isEscapeKey(evt) {
  return (evt.keyCode && evt.keyCode === ESC_KEY_CODE);
}
