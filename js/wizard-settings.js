'use strict';
// Здесь изменяю внешний вид моего персонажа
(function () {
  /* Изменение цвета мантии персонажа по нажатию*/
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = window.setup.getRandomElement(window.setup.COATS_COLOR);
  });

  /* Изменение цвета глаз персонажа по нажатию*/
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = window.setup.getRandomElement(window.setup.EYES_COLOR);
  });

  /* Изменение цвета фаерболов по нажатию*/
  var wizardFireball = document.querySelector('.setup-fireball-wrap');
  wizardFireball.addEventListener('click', function () {
    wizardFireball.style.backgroundColor = window.setup.getRandomElement(window.setup.FIREBALL_COLOR);
  });
})();
