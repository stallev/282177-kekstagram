'use strict';

window.pictures = (function () {
  return function () {
    var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
    var pictures = [];
    var placeForSmallPictures = document.querySelector('.pictures');
    var elementTemplate = document.querySelector('#picture-template');
    var elementToClone = elementTemplate.content.querySelector('.picture');
    
       
    function render(ob) {
      var newPicture = elementToClone.cloneNode(true);
      newPicture.href = ob.url;
      newPicture.querySelector('img').src = ob.url;
      newPicture.querySelector('.picture-comments').innerHTML = ob.comments.length;
      newPicture.querySelector('.picture-likes').innerHTML = ob.likes;
      return newPicture;
    }
    
    var onLoad = function (data) {
      pictures = data;
      console.log(pictures);
      for (var i = 0; i < pictures.length; i++) {
        var newImage = render(pictures[i]);
        placeForSmallPictures.appendChild(newImage);
        newImage.addEventListener('click', function (evt) {
          sendToShowGallery(evt, i, newImage);
        });
        
      }
    };
    function sendToShowGallery(evt, indexOfElement, smallPicture) {
      evt.preventDefault();
      console.log(indexOfElement);
      window.showGallery(pictures[indexOfElement], smallPicture);
    }
    
    window.load(url, onLoad);
  };
})();

