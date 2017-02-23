'use strict';

window.pictures = (function () {
  return function () {
    var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
    var pictures = [];
    var placeForPictures = document.querySelector('.pictures');
    var elementTemplate = document.querySelector('#picture-template');
    var elementToClone = elementTemplate.content.querySelector('.picture');
    function render(ob) {
      var newPicture = elementToClone.cloneNode(true);
      newPicture.href = ob.url;
      newPicture.querySelector('img').src = ob.url;
      newPicture.querySelector('.picture-comments').innerHTML = ob.comments;
      newPicture.querySelector('.picture-likes').innerHTML = ob.likes;
      return newPicture;
    }
    var onLoad = function (data) {
      pictures = data;
      console.log(pictures);
      for (var i = 0; i < pictures.length; i++) {
        placeForPictures.appendChild(render(pictures[i]));
      }
    };
    window.load(url, onLoad);
  };
})();
