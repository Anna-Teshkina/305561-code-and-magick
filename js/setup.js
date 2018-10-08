'use strict';
// Здесь я отрисовываю похожих магов - файл setup.js
(function () {
  var NUMBER_WIZARD = 4;

  var NAMES_WIZARD = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES_WIZARD = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizards = [];

  window.setup = {
    COATS_COLOR: COATS_COLOR,
    EYES_COLOR: EYES_COLOR,
    FIREBALL_COLOR: FIREBALL_COLOR,

    getRandomElement: function (array) {
      var randomElement = array[Math.floor(Math.random() * array.length)];
      return randomElement;
    }
  };

  var getWizard = function () {
    var flag = Math.round(Math.random());

    var randomName = window.setup.getRandomElement(NAMES_WIZARD);
    var randomSurname = window.setup.getRandomElement(SURNAMES_WIZARD);
    var nameWizard = randomName + ' ' + randomSurname;

    if (flag) {
      nameWizard = randomSurname + ' ' + randomName;
    }

    var coatWizard = window.setup.getRandomElement(COATS_COLOR);
    var eyesWizard = window.setup.getRandomElement(EYES_COLOR);

    var wizard = {
      name: nameWizard,
      coat: coatWizard,
      eyes: eyesWizard
    };

    return wizard;
  };

  for (var i = 0; i < NUMBER_WIZARD; i++) {
    var wizardItem = getWizard();
    wizards.push(wizardItem);
  }

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyes;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);

  document.querySelector('.setup-similar').classList.remove('hidden');
})();
