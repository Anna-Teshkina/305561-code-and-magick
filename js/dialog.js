'use strict';
// Здесь я открываю/закрываю диалог, а также управляю позицией диалога
(function () {
  var FIXED_POPUP_X = '50%';
  var FIXED_POPUP_Y = '80px';

  var setup = document.querySelector('.setup');
  var dialogHandle = setup.querySelector('.upload');
  var setupOpen = document.querySelector('.setup-open');
  var setupIcon = document.querySelector('.setup-open-icon');
  var setupClose = setup.querySelector('.setup-close');
  var setupName = setup.querySelector('.setup-user-name');
  // var setupSubmit = setup.querySelector('.setup-submit');
  var form = setup.querySelector('.setup-wizard-form');

  var onPopupEcsPress = function (evt) {
    if ((evt.keyCode === window.util.ESC_KEYCODE) && (setupName !== document.activeElement)) {
      closePopup();
    }
  };

  /* var sendForm = function () {
    setup.submit();
  };*/

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSave, onSaveError);
  });

  var onSave = function () {
    window.dialog.setup.classList.add('hidden');
  };

  var onSaveError = function (errorMessage) {
    var node = document.createElement('div.error');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '34px';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
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
    // setupSubmit.addEventListener('click', sendForm);
  };

  /* -----------ЗАКРЫТИЕ ОКНА-------------
  -окно.setup должно закрываться по нажатию на элемент.setup-close, расположенный внутри окна
  -когда окно закрыто удаляем обработчик нажатия ecs с объекта документ
  -АЛЬТЕНАТИВНОЕ ЗАКРЫТИЕ: если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно приводить к закрытию диалога*/

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEcsPress);
    /* -----------------*/
    setup.style.top = FIXED_POPUP_Y;
    setup.style.left = FIXED_POPUP_X;
  };


  /* --------ОБРАБОТЧИКИ------------------*/
  setupOpen.addEventListener('click', openPopup);

  setupIcon.addEventListener('keydown', function (evt) {
    /* if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }*/
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', closePopup);

  setupClose.addEventListener('keydown', function (evt) {
    /* if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }*/
    window.util.isEnterEvent(evt, closePopup);
  });

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (prevEvt) {
          prevEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  window.dialog = {
    setup: setup
  };
})();
