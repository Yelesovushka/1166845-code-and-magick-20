'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var COUNT = 4;
var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createWizard() {
  return {
    name: NAMES[getRandomNumber(0, 7)] + ' ' + SURNAMES[getRandomNumber(0, 7)],
    coatColor: COAT_COLORS[getRandomNumber(0, 5)],
    eyesColor: EYES_COLORS[getRandomNumber(0, 4)]
  };
}

function createWizardsArr() {
  var wizards = [];

  for (var i = 0; i < COUNT; i++) {
    wizards.push(createWizard());
  }

  return wizards;
}

function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

function renderAllWizards() {
  var fragment = document.createDocumentFragment();
  var allWizards = createWizardsArr();

  for (var i = 0; i < allWizards.length; i++) {
    fragment.appendChild(renderWizard(allWizards[i]));
  }

  similarListElement.appendChild(fragment);
}

userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

renderAllWizards();
