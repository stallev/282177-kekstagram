'use strict';
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadSelectImage = document.getElementById('upload-select-image');
var uploadFile = document.querySelector('.upload-file');
// closing image button
var buttonUploadFormClose = document.querySelector('.upload-form-cancel');

var mainImage = document.querySelector('.upload-form-preview > img');

var uploadForm = uploadOverlay.querySelector('form');

var clickableRadioArea = document.querySelectorAll('.upload-filter-preview');

var changeFilterButtonGroup = uploadForm.elements['upload-filter'];

var controlsWrapper = document.querySelector('.upload-filter-controls');
var zoomButton = document.querySelector('.upload-resize-controls-button-inc');
var decreaseButton = document.querySelector('.upload-resize-controls-button-dec');
var imageSizeField = document.querySelector('.upload-resize-controls-value');

// default values
var imageSizeValue = 100;
var imageSizeStep = 25;
var minImageSize = 25;
var maxImageSize = 100;

var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;

uploadOverlay.classList.add('invisible');
uploadSelectImage.classList.remove('invisible');
uploadFile.addEventListener('click', onClickImageOpening);
uploadFile.addEventListener('keydown', onEnterImageOpening);
buttonUploadFormClose.addEventListener('click', onClickUploadImageClosing);
document.addEventListener('keydown', onEscapeImageClosing);
controlsWrapper.addEventListener('click', onClickChangeImageFilter);
controlsWrapper.addEventListener('keydown', onEnterChangeImageFilter);
decreaseButton.addEventListener('click', decreaseImage);
zoomButton.addEventListener('click', increaseImage);

function toggleFilter(target) {
  deleteFilter();
  // make all attributes area-checked false
  deletingAreaChecked(clickableRadioArea);
  togglegAriaChecked(target);
  mainImage.classList.add('filter-' + target.parentNode.previousElementSibling.value);
  changeInputChecked(target);
}

function deleteFilter() {
  for (var i = 0; i < changeFilterButtonGroup.length; i++) {
    mainImage.classList.remove('filter-' + changeFilterButtonGroup[i].value);
  }
}

function deletingAreaChecked(array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('aria-checked', 'false');
  }
}

// toggling aria-checked
function togglegAriaChecked(element) {
  var pressed = (element.getAttribute('aria-checked') === 'true');
  element.setAttribute('aria-checked', !pressed);
}

function changeInputChecked() {
  for (var i = 0; i < clickableRadioArea.length; i++) {
    var targetRadioInput = clickableRadioArea[i].parentNode.previousElementSibling;
    if (targetRadioInput.hasAttribute('checked')) {
      targetRadioInput.removeAttribute('checked');
    }
  }
}

function increaseImage() {
  if (imageSizeValue < maxImageSize) {
    imageSizeValue += imageSizeStep;
    resizeMainPicture(imageSizeValue / 100);
  }
}

function decreaseImage() {
  if (imageSizeValue > minImageSize) {
    imageSizeValue -= imageSizeStep;
    resizeMainPicture(imageSizeValue / 100);
  }
}

function resizeMainPicture(size) {
  mainImage.style.transform = 'scale(' + size + ')';
  mainImage.style.webkitTransform = 'scale(' + size + ')';
  imageSizeField.value = size * 100 + '%';
}

function onClickImageOpening() {
  event.preventDefault();
  uploadImageOpening();
}

function onEnterImageOpening(event) {
  if (isEnterEvent(event)) {
    event.preventDefault();
    uploadImageOpening();
  }
}

function uploadImageOpening() {
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
}

function uploadImageClosing() {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
}

function onClickUploadImageClosing() {
  uploadImageClosing();
  // deleting unnessesary styles
  deleteFilter();
  resizeMainPicture(1);
}

function onEscapeImageClosing(event) {
  if (isEscapeEvent(event)) {
    uploadImageClosing();
    // deleting unnessesary styles
    deleteFilter();
    resizeMainPicture(1);
  }
}

function onEnterChangeImageFilter(event) {
  if (isEnterEvent(event)) {
    toggleFilter(event.target);
  }
}

function onClickChangeImageFilter(event) {
  event.preventDefault();
  if (!event.target.classList.contains('upload-filter-preview')) {
    return;
  }
  toggleFilter(event.target);
}

function isEnterEvent(evt) {
  return (evt.keyCode && evt.keyCode === ENTER_KEY_CODE);
}

function isEscapeEvent(evt) {
  return (evt.keyCode && evt.keyCode === ESC_KEY_CODE);
}
