'use strict';

var container = document.querySelector('.reviews-list');
var element = document.querySelector('.review-template');
var reviewsFilter = document.querySelector('.reviews-filter');
var template = document.getElementById('review-template');
reviewsFilter.classList.add('invisible');

// 1. Перебираем все элементы в структуре данных

/* global reviews */

reviews.forEach(function(review) {
  element = getElementFromTemplate(review);
  container.appendChild(element);

});

reviewsFilter.classList.remove('invisible');

// 2. Для каждого элемента создаем DOM-элемент на основе шаблона

/**
* @param {Object} data
* @return {Element}
*/

function getElementFromTemplate(data) {

	/**
	var element = template.content.children[0].cloneNode(true);
	return element;
	*/

  if ('content' in template) {
    var templateElement = template.content.children[0].cloneNode(true);
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

// 4. Добавляем обработку возможных ошибок

  avatarImage.onerror = function() {
    templateElement.classList.add('review-load-failure');
  };

  avatarImage.src = data.author.picture;

  return templateElement;

}
