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

  var RADIUS = 35;
  var STEP = 50;
  var PI = Math.PI;

  for (var i = 0; i < 7; i++) {
    if (i === 0) {
      ctx.arc(x + RADIUS + STEP * i, y + RADIUS, RADIUS, 0.3 * PI, 1.8 * PI);
    }
    ctx.arc(x + RADIUS + STEP * i, y + RADIUS, RADIUS, 1.2 * PI, 1.8 * PI);
  }

  for (i = 0; i < 5; i++) {
    if (i === 0) {
      ctx.arc(x + RADIUS + STEP * 7, y + RADIUS + STEP * i, RADIUS, 1.2 * PI, 2.3 * PI);
    }
    if (i === 4) {
      ctx.arc(x + RADIUS + STEP * 7, y + RADIUS + STEP * i, RADIUS, 1.2 * PI, 3 * PI);
    }
    ctx.arc(x + RADIUS + STEP * 7, y + RADIUS + STEP * i, RADIUS, 1.7 * PI, 2.3 * PI);
  }

  for (i = 6; i >= 0; i--) {
    if (i === 0) {
      ctx.arc(x + RADIUS + STEP * i, y + RADIUS + STEP * 4, RADIUS, 0.2 * PI, 1.3 * PI);
    }
    ctx.arc(x + RADIUS + STEP * i, y + RADIUS + STEP * 4, RADIUS, 0.2 * PI, 0.8 * PI);
  }

  for (i = 3; i > 0; i--) {
    ctx.arc(x + RADIUS, y + RADIUS + STEP * i, RADIUS, 0.7 * PI, 1.3 * PI);
  }

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
  }
  return maxElement;
};

var getString = function (ctx, txt) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  for (var i = 0; i < txt.length; i++) {
    ctx.fillText(txt[i], CLOUD_X + TEXT_START_X, TEXT_START_Y + TEXT_GAP * i);
  }
};

var getColumn = function (ctx, name, mTime, time, y, j) {
  if (name === 'Вы') {
    ctx.fillStyle = 'red';
  } else {
    var opacity = 0;
    while (opacity < 0.1) {
      opacity = Math.round(Math.random() * 100) / 100;
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
  getString(ctx, text);
  var statisticY = CLOUD_Y + TEXT_GAP * text.length + TEXT_GAP * 2;
  var maxTime = Math.round(getMaxElement(times));

  for (var i = 0; i < names.length; i++) {
    getColumn(ctx, names[i], maxTime, times[i], statisticY, i);
  }
};
