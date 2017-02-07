'use strict';
var uploadOverlay = document.querySelector('.upload-overlay');



var uploadSelectImage = document.getElementById('upload-select-image');

var uploadFile = document.querySelector('.upload-file');

// closing image button
var uploadFormCancel = document.querySelector('.upload-form-cancel');

var mainImage = document.querySelector('.upload-form-preview > img');

var uploadForm = uploadOverlay.querySelector('form');

var targetDivs = document.querySelectorAll('.upload-filter-preview');

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

uploadFile.addEventListener('click', onClickUploadImageWindowOpening);

uploadFile.addEventListener('keydown', onKeyboardUploadImageWindowOpening);

uploadFormCancel.addEventListener('click', onClickUploadImageWindowClosing);
document.addEventListener('keydown', onKeyboardUploadImageWindowClosing);


controlsWrapper.addEventListener('click', onClickChangeImageFilter);


controlsWrapper.addEventListener('keydown', onKeyboardChangeImageFilter);

function toogleFilter(target) {
  deleteFilter();
  // make all attributes area-checked false
  deletingAreaChecked(targetDivs);
  tooglingAria(target);
  //changeInputChecked(target);
  mainImage.classList.add(target.parentNode.getAttribute('for').substr(7));
}

function deleteFilter() {
  for (var i = 0; i < controls.length; i++) {
    mainImage.classList.remove('filter-' + controls[i].value);
  }
}

function deletingAreaChecked(array) {
  for (var j = 0; j < array.length; j++) {
    array[j].setAttribute('aria-checked', 'false');
  }
}

// toogling aria-checked
function tooglingAria(div) {
  var pressed = (div.getAttribute('aria-checked') === 'true');
  div.setAttribute('aria-checked', !pressed);
}

/*function changeInputChecked(targetDiv) {
  for(var k = 0; k < targetDivs.length; k++) {
    if (!targetDivs[k].parentNode.previousElementSibling.remove('checked'))
    targetDiv[k].parentNode.previousElementSibling.setAttribute('checked');
  }
}*/

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

function onClickUploadImageWindowOpening() {
  event.preventDefault();
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
}

function onKeyboardUploadImageWindowOpening(event) {
  if (activateEvent(event)) {
    event.preventDefault();
    uploadOverlay.classList.remove('invisible');
    uploadSelectImage.classList.add('invisible');
  }
}

function onClickUploadImageWindowClosing() {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
  // deleting unnessesary styles
  deleteFilter();
  resizeMainPicture(1);
}

function onKeyboardUploadImageWindowClosing(event) {
  if (escapeEvent(event)) {
    uploadOverlay.classList.add('invisible');
    uploadSelectImage.classList.remove('invisible');
    // deleting unnessesary styles
    deleteFilter();
    resizeMainPicture(1);
  }
}
function onKeyboardChangeImageFilter(event) {
  if (activateEvent(event)) {
    toogleFilter(event.target);
  }
}
function onClickChangeImageFilter(event) {
  event.preventDefault();
  if (!event.target.classList.contains('upload-filter-preview')) {
    return;
  }
  toogleFilter(event.target);
}
function activateEvent(evt) {
  return (evt.keyCode && evt.keyCode === ENTER_KEY_CODE);
}

function escapeEvent(evt) {
  return (evt.keyCode && evt.keyCode === ESC_KEY_CODE);
}
