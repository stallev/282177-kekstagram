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

// getting array of the filter input
var controls = uploadForm.elements['upload-filter'];

// zoom button
var zoomButton = document.querySelector('.upload-resize-controls-button-inc');

// decrease button
var decreaseButton = document.querySelector('.upload-resize-controls-button-dec');

// image size field
var imageSizeField = document.querySelector('.upload-resize-controls-value');

// default value
var imageSizeValue = 100;
var imageSizeStep = 25;
var minImageSize = 25;
var maxImageSize = 100;

uploadOverlay.classList.add('invisible');
uploadSelectImage.classList.remove('invisible');

// changing the value of the upload file field
uploadFile.addEventListener('click', function () {
  event.preventDefault();
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
});

// closing image button event
uploadFormCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
  // deleting unnessesary styles
  deleteFilter();
  resizeMainPicture(1);
});

// changing filters for the image
for (var i = 0; i < controls.length; i++) {
  checkControl(controls[i]);
}

// creating event listener for radio
function checkControl(control) {
  control.addEventListener('click', function () {
    toogleFilter(control);
  });
}

function toogleFilter(control) {
  deleteFilter();
  mainImage.classList.add('filter-' + control.value);
}

function deleteFilter() {
  for (i = 0; i < controls.length; i++) {
    mainImage.classList.remove('filter-' + controls[i].value);
  }
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
