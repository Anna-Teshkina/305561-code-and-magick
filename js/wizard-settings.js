'use strict';
// Здесь изменяю внешний вид моего персонажа
(function () {
  var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  /* Изменение цвета мантии персонажа по нажатию*/
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = window.util.getRandomElement(COATS_COLOR);
  });

  /* Изменение цвета глаз персонажа по нажатию*/
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = window.util.getRandomElement(EYES_COLOR);
  });

  /* Изменение цвета фаерболов по нажатию*/
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  wizardFireball.addEventListener('click', function () {
    wizardFireball.style.backgroundColor = window.util.getRandomElement(FIREBALL_COLOR);
  });
})();
