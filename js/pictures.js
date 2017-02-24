'use strict';

window.pictures = (function () {
  return function () {
    var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
    var pictures = [];
    var placeForSmallPictures = document.querySelector('.pictures');
    var elementTemplate = document.querySelector('#picture-template');
    var elementToClone = elementTemplate.content.querySelector('.picture');
    var ENTER_KEY_CODE = 13;

    function onLoad(data) {
      pictures = data;
      pictures.forEach(getNewPicture);
    }

    function getNewPicture(element, i) {
      var newPicture = elementToClone.cloneNode(true);
      newPicture.dataset.pictureId = i;
      newPicture.href = element.url;
      newPicture.querySelector('img').src = element.url;
      var commentsElement = newPicture.querySelector('.picture-comments').innerHTML;
      commentsElement = element.comments.length;
      var likesElement = newPicture.querySelector('.picture-likes').innerHTML;
      likesElement = element.likes;
      placeForSmallPictures.appendChild(newPicture);

      newPicture.addEventListener('click', function (event) {
        event.preventDefault();
        window.showGallery(element);
      });

      newPicture.addEventListener('keydown', function (event) {
        if (event.keyCode && event.keyCode === ENTER_KEY_CODE) {
          event.preventDefault();
          window.showGallery(element);
        }

      });
    }

    window.load(url, onLoad);
  };
})();

