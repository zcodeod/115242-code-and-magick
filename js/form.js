'use strict';

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
    notifyText.style.visibility = !textValid ? 'visinle' : 'hidden';

    button.disabled = !formValid;

  };

  validate();

  nameInput.oninput = validate;
  textInput.oninput = validate;

  for ( var i = 0; i < markInput.length; ++i ) {
    markInput[i].onclick = validate;
  }

})();
