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

var controls = uploadForm.elements['upload-filter'];
console.log(controls.length);
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
//closing image button event
uploadFormCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('invisible');
  uploadSelectImage.classList.remove('invisible');
});
for (var i = 0; i < controls.length; i++){
  if(controls[i].checked) {
    if(i === 0) {
      console.log('первый');
    }
    //mainImage.className = '';
    console.log(12);
    mainImage.classList.add('filter-image-preview');
    console.log(filters[i]);
    mainImage.classList.add(filters[i - 1]);
  }
}
