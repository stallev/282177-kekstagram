'use strict';
var uploadOverlay = document.querySelector('.upload-overlay');

var uploadSelectImage = document.getElementById('upload-select-image');

var uploadFile = document.querySelector('.upload-file');

// closing image button
var uploadFormCancel = document.querySelector('.upload-form-cancel');

var mainImage = document.querySelector('.upload-form-preview > img');

var uploadForm = uploadOverlay.querySelector('form');

var clickableRadioArea = document.querySelectorAll('.upload-filter-preview');

// getting array of the filter input
var controls = uploadForm.elements['upload-filter'];

// controls fieldset, for common addEventListener
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
uploadFile.addEventListener('click', onClickUploadImageOpening);
uploadFile.addEventListener('keydown', onEnterUploadImageOpening);
uploadFormCancel.addEventListener('click', onClickUploadImageClosing);
document.addEventListener('keydown', onEscapeUploadImageClosing);
controlsWrapper.addEventListener('click', onClickChangeImageFilter);
controlsWrapper.addEventListener('keydown', onEnterChangeImageFilter);

function toggleFilter(target) {
  deleteFilter();
  // make all attributes area-checked false
  deletingAreaChecked(clickableRadioArea);
  togglingAria(target);
  mainImage.classList.add('filter-' + target.parentNode.previousElementSibling.value);
  changeInputChecked(target);
}

function deleteFilter() {
  for (var i = 0; i < controls.length; i++) {
    mainImage.classList.remove('filter-' + controls[i].value);
  }
}

function deletingAreaChecked(array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('aria-checked', 'false');
  }
}

// toggling aria-checked
function togglingAria(ariaCheckedTrueControl) {
  var pressed = (ariaCheckedTrueControl.getAttribute('aria-checked') === 'true');
  ariaCheckedTrueControl.setAttribute('aria-checked', !pressed);
}

function changeInputChecked() {
  for (var i = 0; i < clickableRadioArea.length; i++) {
    var targetRadioInput = clickableRadioArea[i].parentNode.previousElementSibling;
    if (targetRadioInput.hasAttribute('checked')) {
      targetRadioInput.removeAttribute('checked');
    }
  }
}

decreaseButton.addEventListener('click', function () {
  if (imageSizeValue > minImageSize) {
    imageSizeValue -= imageSizeStep;
    resizeMainPicture(imageSizeValue / 100);
  }
});

zoomButton.addEventListener('click', function () {
  if (imageSizeValue < maxImageSize) {
    imageSizeValue += imageSizeStep;
    resizeMainPicture(imageSizeValue / 100);
  }
});

function resizeMainPicture(size) {
  mainImage.style.transform = 'scale(' + size + ')';
  mainImage.style.webkitTransform = 'scale(' + size + ')';
  imageSizeField.value = size * 100 + '%';
}

function onClickUploadImageOpening() {
  event.preventDefault();
  uploadImageOpening();
}

function onEnterUploadImageOpening(event) {
  if (enterEvent(event)) {
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

function onEscapeUploadImageClosing(event) {
  if (escapeEvent(event)) {
    uploadImageClosing();
    // deleting unnessesary styles
    deleteFilter();
    resizeMainPicture(1);
  }
}

function onEnterChangeImageFilter(event) {
  if (enterEvent(event)) {
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

function enterEvent(evt) {
  return (evt.keyCode && evt.keyCode === ENTER_KEY_CODE);
}

function escapeEvent(evt) {
  return (evt.keyCode && evt.keyCode === ESC_KEY_CODE);
}
