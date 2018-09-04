'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;

var CLOUD_GAP = 10;
var CLOUD_HEIGHT = 270;

var TEXT_START_X = 30;
var TEXT_START_Y = 40;
var TEXT_GAP = 20;

var COLUMN_WIDTH = 40;
var COLUMN_MARGIN = 50;
var COLUMN_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + 35, y + 35, 35, 0.3 * Math.PI, 1.8 * Math.PI);
  ctx.arc(x + 35 + 50, y + 35, 35, 1.2 * Math.PI, 1.8 * Math.PI);
  ctx.arc(x + 35 + 50 * 2, y + 35, 35, 1.2 * Math.PI, 1.8 * Math.PI);
  ctx.arc(x + 35 + 50 * 3, y + 35, 35, 1.2 * Math.PI, 1.8 * Math.PI);
  ctx.arc(x + 35 + 50 * 4, y + 35, 35, 1.2 * Math.PI, 1.8 * Math.PI);
  ctx.arc(x + 35 + 50 * 5, y + 35, 35, 1.2 * Math.PI, 1.8 * Math.PI);
  ctx.arc(x + 35 + 50 * 6, y + 35, 35, 1.2 * Math.PI, 1.8 * Math.PI);
  ctx.arc(x + 35 + 50 * 7, y + 35, 35, 1.2 * Math.PI, 2.3 * Math.PI);
  ctx.arc(x + 35 + 50 * 7, y + 35 + 50, 35, 1.7 * Math.PI, 2.3 * Math.PI);
  ctx.arc(x + 35 + 50 * 7, y + 35 + 50 * 2, 35, 1.7 * Math.PI, 2.3 * Math.PI);
  ctx.arc(x + 35 + 50 * 7, y + 35 + 50 * 3, 35, 1.7 * Math.PI, 2.3 * Math.PI);
  ctx.arc(x + 35 + 50 * 7, y + 35 + 50 * 4, 35, 1.7 * Math.PI, 3 * Math.PI);
  ctx.arc(x + 35 + 50 * 6, y + 35 + 50 * 4, 35, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.arc(x + 35 + 50 * 5, y + 35 + 50 * 4, 35, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.arc(x + 35 + 50 * 4, y + 35 + 50 * 4, 35, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.arc(x + 35 + 50 * 3, y + 35 + 50 * 4, 35, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.arc(x + 35 + 50 * 2, y + 35 + 50 * 4, 35, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.arc(x + 35 + 50, y + 35 + 50 * 4, 35, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.arc(x + 35, y + 35 + 50 * 4, 35, 0.2 * Math.PI, 1.3 * Math.PI);
  ctx.arc(x + 35, y + 35 + 50 * 3, 35, 0.7 * Math.PI, 1.3 * Math.PI);
  ctx.arc(x + 35, y + 35 + 50 * 2, 35, 0.7 * Math.PI, 1.3 * Math.PI);
  ctx.arc(x + 35, y + 35 + 50, 35, 0.7 * Math.PI, 1.3 * Math.PI);
  ctx.fill();
  ctx.closePath();
};

var getMaxElement = function (array) {
  if (array !== '') {
    var maxElement = array[0];
    for (var i = 1; i < array.length; i++) {
      if (array[i] > maxElement) {
        maxElement = array[i];
      }
    }
    return maxElement;
  } else {
    return 0;
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0,0,0,0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', CLOUD_X + TEXT_START_X, TEXT_START_Y);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_START_X, TEXT_START_Y + TEXT_GAP);

  var maxTime = Math.round(getMaxElement(times));

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'red';
    } else {
      var opacity = 0;
      while (opacity < 0.1) {
        opacity = Math.round(Math.random() * 100) / 100;
      }
      ctx.fillStyle = 'rgb(0, 0, 255)';
      ctx.globalAlpha = opacity;
    }

    ctx.fillRect(CLOUD_X + TEXT_START_X + ((COLUMN_WIDTH + COLUMN_MARGIN) * i), 90 + (COLUMN_HEIGHT - COLUMN_HEIGHT / maxTime * times[i]), COLUMN_WIDTH, COLUMN_HEIGHT / maxTime * times[i]);
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + TEXT_START_X + ((COLUMN_WIDTH + COLUMN_MARGIN) * i), CLOUD_Y + CLOUD_HEIGHT - CLOUD_GAP * 2);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + TEXT_START_X + ((COLUMN_WIDTH + COLUMN_MARGIN) * i), 90 + (COLUMN_HEIGHT - COLUMN_HEIGHT / maxTime * times[i]) - CLOUD_GAP);
  }
};
