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
      console.log(pictures);
      pictures.forEach(getNewPicture);
    };
    
    function getNewPicture(elem, i) {
      var newPicture = elementToClone.cloneNode(true);
      newPicture.href = elem.url;
      newPicture.querySelector('img').src = elem.url;
      newPicture.querySelector('.picture-comments').innerHTML = elem.comments.length;
      newPicture.querySelector('.picture-likes').innerHTML = elem.likes;
      placeForSmallPictures.appendChild(newPicture);
      newPicture.addEventListener('click', function (evt) {
        sendToShowGallery(evt, i, newImage);
      });
      newPicture.addEventListener('keydown', function (evt) {
        if (event.keyCode && event.keyCode === ENTER_KEY_CODE) {
          sendToShowGallery(evt, i, newImage);
        }
      });
    }
    
    function sendToShowGallery(evt, indexOfElement, smallPicture) {
      evt.preventDefault();
      console.log(indexOfElement);
      window.showGallery(pictures[indexOfElement], smallPicture);
    }
    
    window.load(url, onLoad);
  };
})();

