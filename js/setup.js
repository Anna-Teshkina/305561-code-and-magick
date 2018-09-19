'use strict';

var NUMBER_WIZARD = 4;

var NAMES_WIZARD = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES_WIZARD = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var wizards = [];

var getRandomElement = function (array) {
  var randomElement = array[Math.floor(Math.random() * array.length)];
  return randomElement;
};

var getWizard = function () {
  var flag = Math.round(Math.random());

  var randomName = getRandomElement(NAMES_WIZARD);
  var randomSurname = getRandomElement(SURNAMES_WIZARD);
  var nameWizard = randomName + ' ' + randomSurname;

  if (flag) {
    nameWizard = randomSurname + ' ' + randomName;
  }

  var coatWizard = getRandomElement(COATS_COLOR);
  var eyesWizard = getRandomElement(EYES_COLOR);

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

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupIcon = document.querySelector('.setup-open-icon');
var setupClose = setup.querySelector('.setup-close');
var setupName = setup.querySelector('.setup-user-name');
var setupSubmit = setup.querySelector('.setup-submit');

var onPopupEcsPress = function (evt) {
  if ((evt.keyCode === ESC_KEYCODE) && (setupName !== document.activeElement)) {
    closePopup();
  }
};

var sendForm = function () {
  setup.submit();
};

/* -----------ОТКРЫТИЕ ОКНА------------
-окно.setup должно открываться по нажатию на блок.setup-open. Открытие окна производится удалением класса hidden у блока
-когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог
-если фокус находится на форме ввода имени, то окно закрываться не должно.
-если диалог открыт, нажатие на кнопку «Сохранить» приводит к отправке формы
-АЛЬТЕНАТИВНОЕ ОТКРЫТИЕ: когда иконка пользователя в фокусе .setup-open-icon, то окно настройки персонажа должно открываться по нажатию кнопки ENTER*/

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEcsPress);
  setupSubmit.addEventListener('click', sendForm);
};

/* -----------ЗАКРЫТИЕ ОКНА-------------
-окно.setup должно закрываться по нажатию на элемент.setup-close, расположенный внутри окна
-когда окно закрыто удаляем обработчик нажатия ecs с объекта документ
-АЛЬТЕНАТИВНОЕ ЗАКРЫТИЕ: если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно приводить к закрытию диалога*/

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEcsPress);
};


/* --------ОБРАБОТЧИКИ------------------*/
setupOpen.addEventListener('click', openPopup);

setupIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', closePopup);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

/* Изменение цвета мантии персонажа по нажатию*/
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getRandomElement(COATS_COLOR);
});

/* Изменение цвета глаз персонажа по нажатию*/
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getRandomElement(EYES_COLOR);
});

/* Изменение цвета фаерболов по нажатию*/
var wizardFireball = document.querySelector('.setup-fireball-wrap');
wizardFireball.addEventListener('click', function () {
  wizardFireball.style.backgroundColor = getRandomElement(FIREBALL_COLOR);
});
