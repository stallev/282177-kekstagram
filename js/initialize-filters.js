'use strict';
window.initializeFilters = function (image, controlsWrapper, filtersInput, filters, onKey) {
  controlsWrapper.addEventListener('click', onSelectFilter);
  controlsWrapper.addEventListener('keydown', onSelectFilterByEnter);

  function onSelectFilterByEnter(event) {
    if (onKey(event)) {
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

  function toggleFilter(target) {
    deleteFilter();
    // make all attributes area-checked false
    deleteAreaChecked(filters);
    toggleAriaChecked(target);
    image.classList.add('filter-' + target.parentNode.previousElementSibling.value);
    changeInputChecked(target);
  }

  function deleteFilter() {
    for (var i = 0; i < filtersInput.length; i++) {
      image.classList.remove('filter-' + filtersInput[i].value);
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
};
