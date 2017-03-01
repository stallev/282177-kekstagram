'use strict';

(function () {
  var formWrapperChangingImage = document.querySelector('.upload-overlay');
  var formSelectingImage = document.getElementById('upload-select-image');
  var fileInputField = document.querySelector('#upload-file');
  var fileInputLabel = document.querySelector('.upload-file');
  var buttonCloseModal = formWrapperChangingImage.querySelector('.upload-form-cancel');
  var scaleControls = formWrapperChangingImage.querySelector('.upload-resize-controls');
  var image = formWrapperChangingImage.querySelector('.upload-form-preview > img');
  var filterLabels = formWrapperChangingImage.querySelector('.upload-filter-controls');

  var imageSizeValue = 100;
  var imageSizeStep = 25;

  formWrapperChangingImage.classList.add('invisible');
  formSelectingImage.classList.remove('invisible');
  fileInputField.addEventListener('change', onFileInputFieldChange);
  fileInputLabel.addEventListener('keydown', onFileInputLabelKeydownEnter);
  buttonCloseModal.addEventListener('click', onButtonCloseModalClick);
  document.addEventListener('keydown', onDocumentKeydownEscape);

  window.pictures();
  window.initializeFilters(filterLabels, applyFilter);
  window.initializeScale(scaleControls, imageSizeStep, imageSizeValue, applyScale);

  function onFileInputFieldChange() {
    open();
  }

  function onFileInputLabelKeydownEnter(event) {
    event.preventDefault();
    if (window.helpers.isEnterKey(event)) {
      fileInputField.click();
    }
  }

  function open() {
    formWrapperChangingImage.classList.remove('invisible');
    formSelectingImage.classList.add('invisible');
  }

  function close() {
    formWrapperChangingImage.classList.add('invisible');
    formSelectingImage.classList.remove('invisible');
  }

  function onButtonCloseModalClick(event) {
    event.preventDefault();
    close();
  }

  function onDocumentKeydownEscape(event) {
    if (window.helpers.isEscapeKey(event)) {
      close();
    }
  }

  function applyFilter(newFilter, oldFilter) {
    image.classList.remove('filter-' + oldFilter);
    image.classList.add('filter-' + newFilter);
  }

  function applyScale(size) {
    image.style.transform = 'scale(' + size / 100 + ')';
  }
})();
