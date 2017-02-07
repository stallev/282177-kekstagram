'use strict';
var uploadOverlay = document.querySelector('.upload-overlay');

// upload image window
var uploadSelectImage = document.getElementById('upload-select-image');

// upload file field
var uploadFile = document.querySelector('.upload-file');

// closing image button
var uploadFormCancel = document.querySelector('.upload-form-cancel');

// main image
var mainImage = document.querySelector('.upload-form-preview > img');

var uploadForm = uploadOverlay.querySelector('form');

var smDiv = document.querySelector('.upload-filter-preview');

// getting array of the filter input
var controls = uploadForm.elements['upload-filter'];

// controls fieldset, for common addEventListener
var controlsWrapper = document.querySelector('.upload-filter-controls');

// zoom button
var zoomButton = document.querySelector('.upload-resize-controls-button-inc');

// decrease button
var decreaseButton = document.querySelector('.upload-resize-controls-button-dec');

// image size field
var imageSizeField = document.querySelector('.upload-resize-controls-value');

// default values
var imageSizeValue = 100;
var imageSizeStep = 25;
var minImageSize = 25;
var maxImageSize = 100;

var ENTER_KEY_CODE = 13;

uploadOverlay.classList.add('invisible');
uploadSelectImage.classList.remove('invisible');

// changing the value of the upload file field
uploadFile.addEventListener('click', function () {
  event.preventDefault();
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
});

// changing the value of the upload file field using the keyboard
uploadFile.addEventListener('keydown', function (event) {
  if (activateEvent(event)) {
    event.preventDefault();
    uploadOverlay.classList.remove('invisible');
    uploadSelectImage.classList.add('invisible');
  }
});

// closing image button event
uploadFormCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
  // deleting unnessesary styles
  deleteFilter();
  resizeMainPicture(1);
});
// closing image button event using the keyboard
uploadFormCancel.addEventListener('keydown', function (event) {
  if (activateEvent(event)) {
    uploadOverlay.classList.add('invisible');
    uploadSelectImage.classList.remove('invisible');
    // deleting unnessesary styles
    deleteFilter();
    resizeMainPicture(1);
  }
});

controlsWrapper.addEventListener('click', function (event) {
  event.preventDefault();
  toogleFilter(event.target);
});

controlsWrapper.addEventListener('keydown', function (event) {
  if (activateEvent(event)) {
    toogleFilter(event.target);
  }
});

function activateEvent(evt) {
  return (evt.keyCode && evt.keyCode === ENTER_KEY_CODE);
}

function toogleFilter(target) {
  deleteFilter();
  // make all attributes area-checked false
  deletingArChck(smDiv);
  tooglingAria(target);
  mainImage.classList.add(target.parentNode.getAttribute('for').substr(7));
}

function deleteFilter() {
  for (var i = 0; i < controls.length; i++) {
    mainImage.classList.remove('filter-' + controls[i].value);
  }
}

function deletingArChck(ob) {
  for (var z = 0; z < ob.length; z++) {
    ob[z].setAttribute('aria-checked', 'false');
  }
}

// toogling aria-checked
function tooglingAria(label) {
  var pressed = (label.getAttribute('aria-checked' === 'true'));
  label.setAttribute('aria-checked', !pressed);
}

// decreasing image
decreaseButton.addEventListener('click', function () {
  if (imageSizeValue > minImageSize) {
    imageSizeValue -= imageSizeStep;
    resizeMainPicture(imageSizeValue / 100);
  }
});

// zooming image
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
