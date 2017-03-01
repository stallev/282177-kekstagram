'use strict';

window.initializeFilters = (function () {
  return function (filterLabels, callback) {
    var filters = document.querySelectorAll('.upload-filter-preview');

    filterLabels.addEventListener('click', onFilterLabelsClick);
    filterLabels.addEventListener('keydown', onFilterLabelsKeydownEnter);

    var oldFilter = 'none';
    var newFilter;

    function toggleFilter(target) {
      // make all attributes area-checked false
      deleteAreaChecked(filters);
      toggleAriaChecked(target);
      if (typeof callback === 'function') {
        callback(newFilter, oldFilter);
      }
      changeInputChecked(target);
      oldFilter = newFilter;
    }

    function deleteAreaChecked(array) {
      for (var i = 0; i < array.length; i++) {
        array[i].setAttribute('aria-checked', 'false');
      }
    }

    function toggleAriaChecked(element) {
      var pressed = (element.getAttribute('aria-checked') === 'true');
      element.setAttribute('aria-checked', !pressed);
      newFilter = element.parentNode.previousElementSibling.value;
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

    function onFilterLabelsKeydownEnter(event) {
      if (window.helpers.isEnterKey(event)) {
        toggleFilter(event.target);
      }
    }

    function onFilterLabelsClick(event) {
      event.preventDefault();
      if (event.target.classList.contains('upload-filter-preview')) {
        toggleFilter(event.target);
      }
    }
  };
})();
