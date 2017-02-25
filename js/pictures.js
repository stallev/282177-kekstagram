'use strict';

window.pictures = (function () {
  return function () {
    var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
    var pictures = [];
    var placeForSmallPictures = document.querySelector('.pictures');
    var elementTemplate = document.querySelector('#picture-template');
    var elementToClone = elementTemplate.content.querySelector('.picture');
    var filters = document.querySelector('.filters');
    var filtersItems = filters.querySelectorAll('.filters-item');

    filters.addEventListener('click', sortingPictures);

    window.load(url, onLoad);
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

    function sortingPictures(event) {
      event.preventDefault();
      if (event.target.classList.contains('filters-item')) {
        changeInputChecked(event.target);
        renderPictures(event.target.control.id);
      }
    }

    function renderPictures(filterId) {
      var modifiedArray = pictures;
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
      drawImages(modifiedArray);
    }

    function sortPicturesByDiscussions(array) {
      var modifiedArray = array.slice(0);
      return modifiedArray.sort(compare);
      function compare(a, b) {
        return a.comments.length - b.comments.length;
      }
    }

    function sortPicturesByNew(array) {
      var modifiedArray = array.slice(0);
      return modifiedArray.sort(compareRandomly).slice(0, 10);
      function compareRandomly() {
        return Math.random() * 10 - 5;
      }
    }

    function changeInputChecked(target) {
      for (var i = 0; i < filtersItems.length; i++) {
        var targetRadioInput = filtersItems[i].previousElementSibling;
        if (targetRadioInput.hasAttribute('checked')) {
          targetRadioInput.removeAttribute('checked');
        }
      }
      target.previousElementSibling.setAttribute('checked', 'true');
    }
  };
})();

