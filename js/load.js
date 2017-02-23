'use strict';

window.load = (function () {
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.addEventListener('load', function () {
      onLoad(JSON.parse(xhr.response));
    });
    xhr.send();
  };
})();
