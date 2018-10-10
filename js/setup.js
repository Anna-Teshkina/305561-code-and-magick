'use strict';
// Здесь я отрисовываю похожих магов - файл setup.js
(function () {
  var onLoadSuccess = function (data) {
    var NUMBER_WIZARD = 4;
    var wizards = window.util.getShuffleArray(data);

    var similarListElement = document.querySelector('.setup-similar-list');
    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

    var renderWizard = function (wizard) {
      var wizardElement = similarWizardTemplate.cloneNode(true);

      wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

      return wizardElement;
    };

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < NUMBER_WIZARD; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);

    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onLoadError = function (errorMessage) {
    var node = document.createElement('div.error');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoadSuccess, onLoadError);
})();
