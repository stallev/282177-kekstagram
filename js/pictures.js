'use strict';

window.pictures = (function () {
  return function () {
    var url = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
    var pictures = [];
    var placeForSmallPictures = document.querySelector('.pictures');
    var elementTemplate = document.querySelector('#picture-template');
    var elementToClone = elementTemplate.content.querySelector('.picture');
    var arrayOfAllSmallPictures = [];
    var filterPopular = document.querySelector('#filter-popular');
    var filterNew = document.querySelector('#filter-new');
    var filterDiscussed = document.querySelector('#filter-discussed');
    var ENTER_KEY_CODE = 13;

    var onLoad = function (data) {
      pictures = data;
      pictures.forEach(getNewPicture);
      arrayOfAllSmallPictures = placeForSmallPictures.querySelectorAll('a.picture');
      document.querySelector('.filters').classList.remove('hidden');
      console.log(arrayOfAllSmallPictures);
      console.log(parseInt(placeForSmallPictures.querySelector('.picture-comments').innerHTML));
    };

    function getNewPicture(elem, i) {
      var newPicture = elementToClone.cloneNode(true);
      newPicture.dataset.pictureId = i;
      newPicture.href = elem.url;
      newPicture.querySelector('img').src = elem.url;
      newPicture.querySelector('.picture-comments').innerHTML = elem.comments.length;
      newPicture.querySelector('.picture-likes').innerHTML = elem.likes;
      addElementToPictureContainer(newPicture);
    }

    placeForSmallPictures.addEventListener('click', showPicture);
    placeForSmallPictures.addEventListener('keydown', function (event) {
      if (event.keyCode && event.keyCode === ENTER_KEY_CODE) {
        showPicture(event);
      }
    });
    filterPopular.addEventListener('click', sortPicturesByPopularity);
    filterNew.addEventListener('click', sortPicturesByNew);
    filterDiscussed.addEventListener('click', sortPicturesByDiscussions);

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
    
    function addElementToPictureContainer(el) {
      //console.log(el);
      placeForSmallPictures.appendChild(el);
    }
    
    function sortPicturesByPopularity() {
      addPicturesToContainer(arrayOfAllSmallPictures);
    }
  
    function sortPicturesByDiscussions() {
      var modifiedArrayOfPictures = arrayOfAllSmallPictures;
      modifiedArrayOfPictures.sort(compare);
      addPicturesToContainer(modifiedArrayOfPictures);
    }
  
    function sortPicturesByNew() {
      var modifiedArrayOfPictures = [];
      for (var j = 0; j < 10; j++) {
        modifiedArrayOfPictures[j] = arrayOfAllSmallPictures[(Math.random()*arrayOfAllSmallPictures.length).toFixed(0)];
        console.log(modifiedArrayOfPictures[j]);
      }
      addPicturesToContainer(modifiedArrayOfPictures);
    }
    
    function compare(a, b) {
      function compareCommentsCount() {
        if(parseInt(a.querySelector('.picture-comments').innerHTML) > parseInt(b.querySelector('.picture-comments').innerHTML)) return 1;
        if(parseInt(a.querySelector('.picture-comments').innerHTML) < parseInt(b.querySelector('.picture-comments').innerHTML)) return -1;
      }
    }
    
    function addPicturesToContainer (arrayOfPictures) {
      placeForSmallPictures.innerHTML = '';
      arrayOfPictures.forEach(addElementToPictureContainer);
    }
  
    window.load(url, onLoad);
  };
})();

