'use strict';
var uploadOverlay = document.querySelector('.upload-overlay');
// upload image window
var uploadSelectImage = document.getElementById('upload-select-image');
// upload file field
var uploadFile = document.querySelector('.upload-file');
//closing image button
var uploadFormCancel = document.querySelector('.upload-form-cancel');
// main image
var mainImage = document.querySelector('.upload-form-preview > img');
var uploadForm = uploadOverlay.querySelector('form');
// getting array of the filter input
var controls = uploadForm.elements['upload-filter'];
// filters list
var filters =
    ['filter-chrome',
    'filter-sepia',
    'filter-marvin',
    'filter-phobos',
    'filter-heat'];

uploadOverlay.classList.add('invisible');
uploadSelectImage.classList.remove('invisible');

// changing the value of the upload file field
if(uploadFile !== 0) {
  uploadOverlay.classList.remove('invisible');
  uploadSelectImage.classList.add('invisible');
}
// closing image button event
uploadFormCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
});
// changing filters for the image
for (var i = 0; i < controls.length; i++){
  checkControl(controls[i]);
}
// creating event listener for radio
function checkControl (control) {
  control.addEventListener('click', function() {
    toogleFilter(control);
  });
}
function toogleFilter(control) {
  if (control === 0) {
    console.log('первый');
    return;
  }
  mainImage.className = '';
  mainImage.classList.add('filter-image-preview');
  addingClass(control);
}
function addingClass(control) {
  // seaching number of the member of the array
  for(var z = 0; z < controls.length; z++) {
    if(controls[z] == control) {
      mainImage.classList.add(filters[z - 1]);
      break;
    }
  }
}
