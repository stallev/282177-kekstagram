'use strict';

window.pictures = (function () {
  return function () {
    var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
    var pictures = [];
    var arrayOfPicturesNodes = [];
    var placeForSmallPictures = document.querySelector('.pictures');
    var elementTemplate = document.querySelector('#picture-template');
    var elementToClone = elementTemplate.content.querySelector('.picture');
    var filters = document.querySelector('.filters');

    filters.addEventListener('click', onSortPicturesBar);

    window.load(url, onLoad);
    function onLoad(data) {
      pictures = data;
      drawImages(pictures);
      filters.classList.remove('hidden');
      arrayOfPicturesNodes = document.querySelectorAll('.picture');
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
      var commentsCount = newPicture.querySelector('.picture-comments');
      var likesCount = newPicture.querySelector('.picture-likes');
      image.src = element.url;
      commentsCount.innerHTML = element.comments.length;
      likesCount.innerHTML = element.likes;

      newPicture.addEventListener('click', function (event) {
        event.preventDefault();
        window.showGallery(element);
      });
      return newPicture;
    }

    function onSortPicturesBar(event) {
      if (event.target.classList.contains('filters-item')) {
        var array = sortPictures(event.target.control.id);
        drawImages(array);
      }
    }

    function sortPictures(filterId) {
      var modifiedArray = arrayOfPicturesNodes;
      switch (filterId) {
        case 'filter-popular':
          break;
        case 'filter-new':
          modifiedArray = sortPicturesByNew(modifiedArray);
          break;
        case 'filter-discussed':
          modifiedArray = sortPicturesByDiscussions(modifiedArray);
          break;
      }
      return modifiedArray;
    }

    function sortPicturesByDiscussions(array) {
      var copy = array.slice(0);
      return copy.sort(function (pictureFirst, pictureSecond) {
        return pictureFirst.comments.length - pictureSecond.comments.length;
      });
    }

    function sortPicturesByNew(array) {
      var copy = array.slice(0);
      return copy.sort(function () {
        return Math.random() < 0.5;
      }).slice(0, 10);
    }
  };
})();

