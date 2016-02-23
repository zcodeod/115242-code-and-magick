'use strict';

var container = document.querySelector('.reviews-list');
var reviewsFilter = document.querySelector('.reviews-filter');
var template = document.getElementById('review-template');


var activeFilter = 'filter-all';
var reviews = [];

var filterItems = document.querySelectorAll('.reviews-filter-item');
for ( var i = 0; i < filterItems.length; i++) {
  filterItems[i].onclick = function(evt) {
    var clickedElementId = evt.target.previousElementSibling.id;
    setActiveFilter(clickedElementId);
  };
}

getReviews();


function renderReviews(reviewsRender) {
  container.innerHTML = '';
  var fragment = document.createDocumentFragment();
  reviewsRender.forEach(function(review) {
    var element = getElementFromTemplate(review);
    fragment.appendChild(element);
  });

  container.appendChild(fragment);
}


// Отрисовка списка отелей

function setActiveFilter(id) {
  if (activeFilter === id) {
    return;
  }


// Фильтруем список отзывов

  var filteredReviews = reviews.slice(0);

  switch (id) {
    case 'reviews-good':
      filteredReviews = filteredReviews.filter(function(a) {
        return a.rating >= 3;
      });

      filteredReviews = filteredReviews.sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;

    case 'reviews-bad':
      filteredReviews = filteredReviews.filter(function(a) {
        return a.rating <= 2;
      });

      filteredReviews = filteredReviews.sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;

    case 'reviews-popular':

      filteredReviews = filteredReviews.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;

    case 'reviews-recent':
      var twoWeeksAgo = new Date() - 14 * 24 * 3600 * 1000;
      filteredReviews = filteredReviews.filter(function(a) {
        return a.date <= twoWeeksAgo;
      });
      filteredReviews = filteredReviews.sort(function(a, b) {
        return Date.parse(b.date) - Date.parse(a.date);
      });
      break;
  }

  renderReviews(filteredReviews);
}


// Загрузка списка отелей

function getReviews() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '//o0.github.io/assets/json/reviews.json');
  xhr.onload = function(evt) {
    var rawData = evt.target.response;
    reviews = JSON.parse(rawData);
    container.classList.remove('reviews-list-loading');

    renderReviews(reviews);

    reviewsFilter.classList.remove('invisible');
  };

  xhr.onerror = function() {
    container.classList.add('reviews-load-failure');
  };

  container.classList.add('reviews-list-loading');
  reviewsFilter.classList.add('invisible');

  xhr.send();
}


// Загружаем данные

function getElementFromTemplate(data) {

  var templateElement;

  if ('content' in template) {
    templateElement = template.content.children[0].cloneNode(true);
  } else {
    templateElement = template.children[0].cloneNode(true);
  }

  var number = ['two', 'three', 'four', 'five'][data.rating - 2];
  var rateStar = templateElement.querySelector('.review-rating');

  if ( data.rating > 2 ) {
    rateStar.classList.add('review-rating-' + number);
  }

  var authorImage = templateElement.querySelector('.review-author');
  templateElement.querySelector('.review-text').textContent = data.description;

  var avatarImage = new Image();
  avatarImage.onload = function() {
    avatarImage.style.width = '124px';
    avatarImage.style.height = '124px';
    avatarImage.classList.add('review-author');
    templateElement.replaceChild(avatarImage, authorImage);
  };

//  Добавляем обработку возможных ошибок

  avatarImage.onerror = function() {
    templateElement.classList.add('review-load-failure');
  };

  avatarImage.src = data.author.picture;

  return templateElement;

}
