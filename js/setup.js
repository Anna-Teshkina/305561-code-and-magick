'use strict';

var NUMBER_WIZARD = 4;

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var NAMES_WIZARD = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES_WIZARD = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];

var getWizard = function() {
  var flag = Math.round(Math.random());

  if (flag) {
    var nameWizard = NAMES_WIZARD[Math.floor(Math.random() * NAMES_WIZARD.length)] + ' ' + SURNAMES_WIZARD[Math.floor(Math.random() * SURNAMES_WIZARD.length)];
  } else {
    var nameWizard = SURNAMES_WIZARD[Math.floor(Math.random() * SURNAMES_WIZARD.length)] + ' ' + NAMES_WIZARD[Math.floor(Math.random() * NAMES_WIZARD.length)];
  }

  var coatWizard = COATS_COLOR[Math.floor(Math.random() * COATS_COLOR.length)];
  var eyesWizard = EYES_COLOR[Math.floor(Math.random() * EYES_COLOR.length)];

  var wizard = {
    name: nameWizard,
    coat: coatWizard,
    eyes: eyesWizard
  }

  return wizard;
}

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
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
