'use strict';
/* global docCookies */

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

})();

(function() {
  var form = document.querySelector('.overlay.review-form');
  var markInput = form.elements['review-mark'];
  var nameInput = form.elements['review-name'];
  var textInput = form.elements['review-text'];
  var notifyFields = form.querySelector('.review-fields');
  var notifyName = form.querySelector('.review-fields-name');
  var notifyText = form.querySelector('.review-fields-text');
  var button = form.querySelector('.review-submit');

  nameInput.required = true;

  var validate = function() {
    textInput.required = +markInput.value < 3;

    var nameValid = nameInput.validity.valid;
    var textValid = textInput.validity.valid;
    var formValid = nameValid && textValid;

    notifyFields.style.visibility = !formValid ? 'visible' : 'hidden';
    notifyName.style.visibility = !nameValid ? 'visible' : 'hidden';
    notifyText.style.visibility = !textValid ? 'visible' : 'hidden';

    button.disabled = !formValid;

  };

  validate();

  nameInput.oninput = validate;
  textInput.oninput = validate;

  for ( var i = 0; i < markInput.length; ++i ) {
    markInput[i].onclick = validate;
  }

  nameInput.value = docCookies.getItem('nameInput');
  markInput.value = docCookies.getItem('markInput') || 3;

  form.onsubmit = function(evt) {
    evt.preventDefault();

    var today = new Date();
    var thisYear = today.getFullYear();
    var thisBirthday = new Date(thisYear, 7, 26);

    if ( today < thisBirthday ) {
      thisBirthday = new Date(thisYear - 1, 7, 26);
    }

    var secondDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    var maxAge = secondDate - thisBirthday;
    var dateToExpire = new Date(+today + maxAge);

    document.cookie = 'nameInput=' + nameInput.value + ';expires=' + dateToExpire.toUTCString();
    document.cookie = 'markInput=' + markInput.value + ';expires=' + dateToExpire.toUTCString();
  };

})();
