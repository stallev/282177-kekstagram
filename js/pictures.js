'use strict';

window.pictures = (function () {
  return function () {
    var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
    var pictures = [];
    var placeForSmallPictures = document.querySelector('.pictures');
    var elementTemplate = document.querySelector('#picture-template');
    var elementToClone = elementTemplate.content.querySelector('.picture');
    var filters = document.querySelector('.filters');

    filters.addEventListener('click', onSortPicturesBar);

    window.load(url, onLoad);
    function onLoad(data) {
      pictures = data.forEach(function (item) {
        item.element = getNewPicture(item);
      });
      drawImages(pictures);
      filters.classList.remove('hidden');
    }

    function drawImages(pictures) {
      var fragment = document.createDocumentFragment();
      placeForSmallPictures.innerHTML = '';
      pictures.forEach(function (item) {
        fragment.appendChild(item.element);
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
        var array = sortPictures(event.target.htmlFor);
        drawImages(array);
      }
    }

    function sortPictures(filterId) {
      var modifiedArray = pictures.slice(0);
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
        return Number(pictureFirst.element.querySelector('.picture-comments')) - Number(pictureSecond.element.querySelector('.picture-comments'));
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

