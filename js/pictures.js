'use strict';

window.pictures = (function () {
  return function () {
    var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
    var pictures = [];
    var placeForSmallPictures = document.querySelector('.pictures');
    var elementTemplate = document.querySelector('#picture-template');
    var elementToClone = elementTemplate.content.querySelector('.picture');
    var ENTER_KEY_CODE = 13;

    var onLoad = function (data) {
      pictures = data;
      pictures.forEach(getNewPicture);
    };

    function getNewPicture(elem, i) {
      var newPicture = elementToClone.cloneNode(true);
      newPicture.dataset.pictureId = i;
      newPicture.href = elem.url;
      newPicture.querySelector('img').src = elem.url;
      newPicture.querySelector('.picture-comments').innerHTML = elem.comments.length;
      newPicture.querySelector('.picture-likes').innerHTML = elem.likes;
      placeForSmallPictures.appendChild(newPicture);
    }

    placeForSmallPictures.addEventListener('click', showPicture);
    placeForSmallPictures.addEventListener('keydown', function (event) {
      if (event.keyCode && event.keyCode === ENTER_KEY_CODE) {
        showPicture(event);
      }
    });

    function showPicture(event) {
      event.preventDefault();
      var picture = event.target;
      var pictureIndex = getArrayIndex(picture);
      if (pictureIndex > 0) {
        window.showGallery(pictures[pictureIndex]);
      }
    }

    function getArrayIndex(picture) {
      if (picture.classList.contains('pictures')) {
        return -1;
      }
      while (!picture.classList.contains('picture')) {
        picture = picture.parentElement;
      }
      return picture.dataset.pictureId;
    }

    window.load(url, onLoad);
  };
})();

