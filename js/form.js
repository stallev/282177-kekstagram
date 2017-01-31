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
var imageSize;

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
  var deletedClass = mainImage.classList.item(1);
  mainImage.classList.remove(deletedClass);
  // adding original size to main image
  resizeMainPicture(100);
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
  if (control === 0) {
    return;
  }
  var deletedClass = mainImage.classList.item(1);
  mainImage.classList.remove(deletedClass);
  addingClass(control);
}

// adding class of the new filter to main image
function addingClass(control) {
  mainImage.classList.add('filter-' + control.value);
}

// decreasing image
decreaseButton.addEventListener('click', function () {
  if (imageSizeValue > minImageSize) {
    imageSizeValue -= imageSizeStep;
    imageSize = imageSizeValue;
    resizeMainPicture(imageSize);
  }
});

// zooming image
zoomButton.addEventListener('click', function () {
  if (imageSizeValue < maxImageSize) {
    imageSizeValue += imageSizeStep;
    imageSize = imageSizeValue;
    resizeMainPicture(imageSize);
  }
});

function resizeMainPicture(size) {
  mainImage.style.transform = 'scale(' + size / 100 + ',' + size / 100 + ')';
  mainImage.style.webkitTransform = 'scale(' + size / 100 + ',' + size / 100 + ')';
  imageSizeField.value = '';
  imageSizeField.value = size + '%';
}
