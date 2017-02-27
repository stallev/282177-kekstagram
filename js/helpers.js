'use strict';
window.helpers = (function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  return {
    isEnterKey: function (evt) {
      return (evt.keyCode && evt.keyCode === ENTER_KEY_CODE);
    },

    isEscapeKey: function (evt) {
      return (evt.keyCode && evt.keyCode === ESC_KEY_CODE);
    }
  };
})();
