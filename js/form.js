'use strict';

(function () {
  var formWrapperChangingImage = document.querySelector('.upload-overlay');
  var formSelectingImage = document.getElementById('upload-select-image');
  var fileInput = document.querySelector('.upload-file');
  var buttonCloseModal = formWrapperChangingImage.querySelector('.upload-form-cancel');
  var scaleControls = formWrapperChangingImage.querySelector('.upload-resize-controls');
  var image = formWrapperChangingImage.querySelector('.upload-form-preview > img');
  var filterLabels = formWrapperChangingImage.querySelector('.upload-filter-controls');

  var imageSizeValue = 100;
  var imageSizeStep = 25;

  formWrapperChangingImage.classList.add('invisible');
  formSelectingImage.classList.remove('invisible');
  fileInput.addEventListener('click', onFileInputOpenEditingFormClick);
  fileInput.addEventListener('keydown', onFileInputOpenEditingFormByEnter);
  buttonCloseModal.addEventListener('click', onButtonCloseModalClick);
  document.addEventListener('keydown', onCloseOpenEditingFormByEscape);

  window.pictures();
  window.initializeFilters(filterLabels, applyFilter);
  window.initializeScale(scaleControls, imageSizeStep, imageSizeValue, applyScale);

  function onFileInputOpenEditingFormClick(event) {
    open();
  }

  function onFileInputOpenEditingFormByEnter(event) {
    if (window.helpers.isEnterKey(event)) {
      open();
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

  function onCloseOpenEditingFormByEscape(event) {
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
