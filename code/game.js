// code/game.js
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  CENTER_X,
  CENTER_Y,
  CHARACTER_Y,
  CHARACTER_SCALE,
  BUTTON_WIDTH,
  BUTTON_HEIGHT,
  BUTTON_Y
} from './constants.js';
import { characters, characterData } from './data.js';
import { createStatText, createFloatingText } from './ui.js';

let currentIndex = 0;
let currentCharacter;
let nameText;
let statTexts = [];
let switching = false;
let chooseBtn;
let chooseText;

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: { preload, create }
};

WebFont.load({
  google: { families: ['Inter:400,600'] },
  active: () => new Phaser.Game(config)
});

function preload() {
  this.load.image('background', 'res/bg.png');
  characters.forEach((key, i) => {
    this.load.image(key, `res/${key}.png`);
    this.load.image(`portrait${i}`, `res/portrait${i + 1}.png`);
  });
}

function create() {
  this.add.image(CENTER_X, GAME_HEIGHT / 2, 'background');
  currentCharacter = this.add.sprite(CENTER_X, CHARACTER_Y, characters[currentIndex]).setScale(CHARACTER_SCALE);

  this.tweens.add({
    targets: currentCharacter,
    y: '+=10',
    duration: 1000,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  characters.forEach((key, i) => {
    const btn = this.add.image(90 + i * 120, 850, `portrait${i}`).setInteractive().setScale(0.6);
    btn.on('pointerdown', () => switchCharacter.call(this, i));
  });

  chooseBtn = this.add.rectangle(CENTER_X, BUTTON_Y, BUTTON_WIDTH, BUTTON_HEIGHT, 0xe85b50)
    .setStrokeStyle(2, 0xffcc00)
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true });

  chooseText = this.add.text(CENTER_X, BUTTON_Y, 'ESCOGER', {
    fontSize: '24px',
    fontFamily: 'Inter',
    fontStyle: 'bold',
    color: '#ffcc00',
    align: 'center'
  }).setOrigin(0.5);

  chooseBtn.on('pointerdown', () => showFinalMessage.call(this));

  updateCharacterUI.call(this, characterData[currentIndex]);
}

function switchCharacter(index) {
  if (switching || index === currentIndex) return;
  switching = true;

  nameText?.destroy();
  statTexts.forEach(t => t.destroy());
  statTexts = [];

  const newChar = this.add.sprite(GAME_WIDTH + 200, CHARACTER_Y, characters[index]).setScale(CHARACTER_SCALE);
  this.tweens.add({ targets: currentCharacter, x: -200, duration: 400, ease: 'Cubic.easeIn', onComplete: () => currentCharacter.destroy() });

  this.children.bringToTop(chooseBtn);
  this.children.bringToTop(chooseText);

  this.tweens.add({
    targets: newChar,
    x: CENTER_X,
    duration: 400,
    ease: 'Cubic.easeOut',
    onComplete: () => {
      currentCharacter = newChar;
      this.tweens.add({
        targets: currentCharacter,
        y: '+=10',
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
      updateCharacterUI.call(this, characterData[index], () => switching = false);
    }
  });
  currentIndex = index;
}

function updateCharacterUI(data, onComplete) {
  const fadeDuration = 200;

  nameText?.destroy();
  statTexts.forEach(t => t.destroy());
  statTexts = [];

  nameText = this.add.text(CENTER_X, 40, data.name, {
    fontSize: '52px',
    fontFamily: 'Inter',
    fontStyle: 'bold',
    color: '#ffd700',
    align: 'center',
    shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 4, fill: true }
  }).setOrigin(0.5).setAlpha(0);

  this.tweens.add({ targets: nameText, alpha: 1, duration: fadeDuration });
  this.tweens.add({ targets: nameText, y: '+=5', duration: 800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

  const stats = Object.entries(data.stats);
  stats.forEach(([label, value], i) => {
    const [labelText, stars] = createStatText(this, label, value, 100 + i * 30);
    this.tweens.add({ targets: labelText, alpha: 1, duration: fadeDuration });
    this.tweens.add({ targets: stars, alpha: 1, duration: fadeDuration });
    statTexts.push(labelText, stars);
  });

  this.time.delayedCall(fadeDuration + 100, () => onComplete?.());
}

function showFinalMessage() {
  const blurOverlay = this.add.rectangle(CENTER_X, CENTER_Y, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.7).setDepth(10);
  const finalMessage = createFloatingText(this, CENTER_X, CENTER_Y, '👏 ¡Gran elección! 👏\nHas ganado 100 XP', { fontSize: '45px' }).setDepth(11);
  const discordNote = this.add.text(20, 20, '👆 Ahora puedes volver a Discord', {
    fontSize: '18px', fontFamily: 'Inter', color: '#ffcc00', align: 'left', fontStyle: 'bold',
    shadow: { offsetX: 1, offsetY: 1, color: '#000000', blur: 2, fill: true }
  }).setDepth(11);

  blurOverlay.setAlpha(0);
  finalMessage.setAlpha(0);

  this.tweens.add({ targets: blurOverlay, alpha: 0.99, duration: 300 });
  this.tweens.add({ targets: finalMessage, alpha: 1, duration: 300 });

  this.time.delayedCall(2000, () => window.close());
}
