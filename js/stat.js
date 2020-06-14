'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 25;
var BIG_GAP = 50;
var MAX_HEIGHT = 150;
var barWidth = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var drawHistogramRect = function (ctx, name, coordinateX, score) {
  ctx.fillStyle = (name === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + getRandomNumber(1, 100) + '%, 50%)';
  ctx.fillRect(coordinateX, CLOUD_Y + FONT_GAP * 3 + GAP + MAX_HEIGHT, barWidth, -score);
};

var drawHistogramText = function (ctx, name, time, coordinateX, score) {
  ctx.fillStyle = '#000';
  ctx.fillText(name, coordinateX, CLOUD_Y + MAX_HEIGHT + FONT_GAP * 4);
  ctx.fillText(Math.round(time), coordinateX, CLOUD_Y + FONT_GAP * 3 + (MAX_HEIGHT - score));
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var gapX = CLOUD_X + BIG_GAP + (BIG_GAP + barWidth) * i;
    var points = (MAX_HEIGHT * times[i]) / maxTime;

    drawHistogramRect(ctx, players[i], gapX, points);
    drawHistogramText(ctx, players[i], times[i], gapX, points);
  }
};
