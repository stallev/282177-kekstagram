'use strict';

window.pictures = (function () {
  return function () {
    var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
    var pictures = [];
    var placeForSmallPictures = document.querySelector('.pictures');
    var elementTemplate = document.querySelector('#picture-template');
    var elementToClone = elementTemplate.content.querySelector('.picture');
    var filters = document.querySelector('.filters');

    function onLoad(data) {
      pictures = data;
      drawImages(pictures);
      filters.classList.remove('hidden');
    }

    function drawImages(picturesArray) {
      var fragment = document.createDocumentFragment();
      placeForSmallPictures.innerHTML = '';
      picturesArray.forEach(function (item) {
        var nodePicture = getNewPicture(item);
        fragment.appendChild(nodePicture);
      });
      placeForSmallPictures.appendChild(fragment);
    }

    function getNewPicture(element) {
      var newPicture = elementToClone.cloneNode(true);
      newPicture.href = element.url;
      var image = newPicture.querySelector('img');
      image.src = element.url;

      newPicture.addEventListener('click', function (event) {
        event.preventDefault();
        window.showGallery(element);
      });
      return newPicture;
    }

    filters.addEventListener('click', sortingPictures);
    
    function sortingPictures(event) {
      event.preventDefault();
      renderPictures(event.target.control.id);
    }

    function renderPictures(filterId) {
      switch (filterId) {
        case 'filter-popular':
          var modifiedArray = pictures;
          break;
        case  'filter-new':
          modifiedArray = sortPicturesByNew();
          break;
        case 'filter-discussed':
          modifiedArray = sortPicturesByDiscussions();
          break;
      }
      drawImages(modifiedArray);
    }

    function sortPicturesByDiscussions() {
      return pictures.slice(0).sort(function (item1, item2) {
        return item1.comments.length - item2.comments.length;
      })
    }

    function sortPicturesByNew() {
      var modifiedArrayOfPictures = [];
      for (var j = 0; j < 10; j++) {
        modifiedArrayOfPictures[j] = pictures[(Math.random()*pictures.length).toFixed(0)];
        console.log(modifiedArrayOfPictures[j]);
      }
      return modifiedArrayOfPictures;
    }
    window.load(url, onLoad);
  };
})();

