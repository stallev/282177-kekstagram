'use strict';

window.initializeFilters = (function () {
  return function (element) {

    window.onSelectFilter = function (callback) {
      element.addEventListener('click', callback);
    };

    window.onSelectFilterByEnter = function (callback) {
      element.addEventListener('click', callback);
    };
  };
})();

