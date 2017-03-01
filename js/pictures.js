'use strict';

window.pictures = (function () {
  return function () {
    var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
    var pictures = [];
    var drawingPictures = [];
    var placeForSmallPictures = document.querySelector('.pictures');
    var elementTemplate = document.querySelector('#picture-template');
    var elementToClone = elementTemplate.content.querySelector('.picture');
    var filters = document.querySelector('.filters');

    filters.addEventListener('click', onSortByClick);

    window.load(url, onLoad);
    function onLoad(data) {
      data.forEach(function (item) {
        item.element = getNewPicture(item);
      });
      pictures = data;
      drawImages(pictures);
      filters.classList.remove('hidden');
    }

    function drawImages(items) {
      var fragment = document.createDocumentFragment();
      items.forEach(function (item) {
        fragment.appendChild(item.element);
        item.element.addEventListener('click', item.handler);
        drawingPictures.push(item);
      });
      placeForSmallPictures.appendChild(fragment);
    }

    function removeImages() {
      drawingPictures.forEach(function (item) {
        item.element.removeEventListener('click', item.handler);
      });
      placeForSmallPictures.innerHTML = '';
      drawingPictures = [];
    }

    function getNewPicture(picture) {
      var newPicture = elementToClone.cloneNode(true);
      var image = newPicture.querySelector('img');
      var commentsCount = newPicture.querySelector('.picture-comments');
      var likesCount = newPicture.querySelector('.picture-likes');
      image.src = picture.url;
      commentsCount.innerHTML = picture.comments.length;
      likesCount.innerHTML = picture.likes;

      var onClick = function (event) {
        event.preventDefault();
        window.showGallery(picture);
      };
      picture.handler = onClick;
      return newPicture;
    }

    function onSortByClick(event) {
      if (event.target.classList.contains('filters-item')) {
        removeImages();
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

    function sortPicturesByDiscussions(copy) {
      return copy.sort(function (b, a) {
        return a.comments.length - b.comments.length;
      });
    }

    function sortPicturesByNew(array) {
      var picturesCount = 10;
      var modifiedArray = [];
      while (modifiedArray.length < picturesCount) {
        var randomIndex = Math.floor(Math.random() * array.length);
        modifiedArray.push(array[randomIndex]);
        array.splice(randomIndex, 1);
      }
      return modifiedArray;
    }
  };
})();

