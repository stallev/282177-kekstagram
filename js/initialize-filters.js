'use strict';

window.initializeFilters = (function () {
  return function () {
    var filters = document.querySelectorAll('.upload-filter-preview');
    var filterButtons = document.querySelectorAll('input[name = "upload-filter"]');
    var filterLabels = document.querySelector('.upload-filter-controls');
    var image = document.querySelector('.upload-form-preview > img');
    var ENTER_KEY_CODE = 13;

    filterLabels.addEventListener('click', onSelectFilter);
    filterLabels.addEventListener('keydown', onSelectFilterByEnter);

    function toggleFilter(target) {
      deleteFilter();
      // make all attributes area-checked false
      deleteAreaChecked(filters);
      toggleAriaChecked(target);
      image.classList.add('filter-' + target.parentNode.previousElementSibling.value);
      changeInputChecked(target);
    }

    function deleteFilter() {
      for (var i = 0; i < filterButtons.length; i++) {
        image.classList.remove('filter-' + filterButtons[i].value);
      }
    }

    function deleteAreaChecked(array) {
      for (var i = 0; i < array.length; i++) {
        array[i].setAttribute('aria-checked', 'false');
      }
    }

    function toggleAriaChecked(element) {
      var pressed = (element.getAttribute('aria-checked') === 'true');
      element.setAttribute('aria-checked', !pressed);
    }

    function changeInputChecked(target) {
      for (var i = 0; i < filters.length; i++) {
        var targetRadioInput = filters[i].parentNode.previousElementSibling;
        if (targetRadioInput.hasAttribute('checked')) {
          targetRadioInput.removeAttribute('checked');
        }
      }
      target.parentNode.previousElementSibling.setAttribute('checked', 'true');
    }

    function onSelectFilterByEnter(event) {
      if (isEnterKey(event)) {
        toggleFilter(event.target);
      }
    }

    function onSelectFilter(event) {
      event.preventDefault();
      if (!event.target.classList.contains('upload-filter-preview')) {
        return;
      }
      toggleFilter(event.target);
    }

    function isEnterKey(evt) {
      return (evt.keyCode && evt.keyCode === ENTER_KEY_CODE);
    }
  };
})();

