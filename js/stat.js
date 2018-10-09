'use strict';

(function () {
  var CLOUD_X = 100;
  var CLOUD_Y = 10;

  var CLOUD_GAP = 10;
  var CLOUD_HEIGHT = 270;
  var CLOUD_WIDTH = 420;

  var TEXT_START_X = 30;
  var TEXT_START_Y = 40;
  var TEXT_GAP = 20;

  var COLUMN_WIDTH = 40;
  var COLUMN_MARGIN = 50;
  var COLUMN_HEIGHT = 150;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    var PI = Math.PI;

    var NUM_X = 7;
    var NUM_Y = 5;

    var radX = CLOUD_WIDTH / (NUM_X * 2);
    var radY = (CLOUD_HEIGHT - radX * 2) / (NUM_Y * 2);

    for (var i = 0; i < NUM_X; i++) {
      if (i === 0) {
        ctx.beginPath();
        ctx.arc(x + radX + radX * 2 * i, y + radX, radX, 0.5 * PI, 2 * PI);
        ctx.arc(x + radX + radX * 2 * i, y + CLOUD_HEIGHT - radX, radX, 0, 3 * PI / 2);
        ctx.fill();
        ctx.closePath();
      }

      if (i === NUM_X - 1) {
        ctx.beginPath();
        ctx.arc(x + radX + radX * 2 * i, y + radX, radX, PI, 5 * PI / 2);
        ctx.arc(x + radX + radX * 2 * i, y + CLOUD_HEIGHT - radX, radX, 3 * PI / 2, 3 * PI);
        ctx.fill();
        ctx.closePath();
      }

      if ((i !== NUM_X - 1) && (i !== 0)) {
        ctx.beginPath();
        ctx.arc(x + radX + radX * 2 * i, y + radX, radX, PI, 2 * PI);
        ctx.arc(x + radX + radX * 2 * i, y + CLOUD_HEIGHT - radX, radX, 0, PI);
        ctx.fill();
        ctx.closePath();
      }
    }

    for (i = 0; i <= NUM_Y; i++) {
      ctx.beginPath();
      ctx.arc(x + radY, y + radX + radY * 2 * i, radY, PI / 2, 3 * PI / 2);
      ctx.arc(x + CLOUD_WIDTH - radY, y + radX + radY * 2 * i, radY, 3 * PI / 2, 5 * PI / 2);
      ctx.fill();
      ctx.closePath();
    }
  };

  var getMaxElement = function (array) {
    if (array !== '') {
      var maxElement = array[0];
      for (var i = 1; i < array.length; i++) {
        if (array[i] > maxElement) {
          maxElement = array[i];
        }
      }
    }
    return maxElement;
  };

  var printString = function (ctx, txt) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    for (var i = 0; i < txt.length; i++) {
      ctx.fillText(txt[i], CLOUD_X + TEXT_START_X, TEXT_START_Y + TEXT_GAP * i);
    }
  };

  var renderColumn = function (ctx, name, mTime, time, y, j) {
    if (name === 'Вы') {
      ctx.fillStyle = 'red';
    } else {
      var opacity = 0;
      while (opacity < 0.1) {
        opacity = Math.random();
      }
      ctx.fillStyle = 'rgb(0, 0, 255)';
      ctx.globalAlpha = opacity;
    }

    ctx.fillRect(CLOUD_X + TEXT_START_X + ((COLUMN_WIDTH + COLUMN_MARGIN) * j), y + (COLUMN_HEIGHT - COLUMN_HEIGHT / mTime * time), COLUMN_WIDTH, COLUMN_HEIGHT / mTime * time);
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#000';
    ctx.fillText(name, CLOUD_X + TEXT_START_X + ((COLUMN_WIDTH + COLUMN_MARGIN) * j), CLOUD_Y + CLOUD_HEIGHT - CLOUD_GAP * 2);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(time), CLOUD_X + TEXT_START_X + ((COLUMN_WIDTH + COLUMN_MARGIN) * j), y + (COLUMN_HEIGHT - COLUMN_HEIGHT / mTime * time) - CLOUD_GAP);
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0,0,0,0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    var text = ['Ура, вы победили!', 'Список результатов:'];
    printString(ctx, text);
    var statisticY = CLOUD_Y + TEXT_GAP * text.length + TEXT_GAP * 2;
    var maxTime = Math.round(getMaxElement(times));

    for (var i = 0; i < names.length; i++) {
      renderColumn(ctx, names[i], maxTime, times[i], statisticY, i);
    }
  };
})();
