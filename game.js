const characters = ['char1', 'char2', 'char3', 'char4'];
let currentIndex = 0;
let currentCharacter;
let nameText;
let statTexts = [];
let switching = false;

const characterData = [
  {
    key: 'char1',
    name: 'Electricista',
    stats: {
      Empleabilidad: 4,
      Resistencia: 3,
      Colaboración: 3
    }
  },
  {
    key: 'char2',
    name: 'Albañil',
    stats: {
      Empleabilidad: 5,
      Resistencia: 5,
      Colaboración: 3
    }
  },
  {
    key: 'char3',
    name: 'Instalador de Gas',
    stats: {
      Empleabilidad: 4,
      Resistencia: 4,
      Colaboración: 3
    }
  },
  {
    key: 'char4',
    name: 'Instalador de Clima',
    stats: {
      Empleabilidad: 4,
      Resistencia: 3,
      Colaboración: 4
    }
  }
];

const config = {
  type: Phaser.AUTO,
  width: 540,
  height: 960,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload,
    create
  }
};

WebFont.load({
  google: {
    families: ['Inter:400,600']
  },
  active: function () {
    const game = new Phaser.Game(config);
  }
});

function preload() {
  this.load.image('background', 'res/bg.png');
  characters.forEach((key, i) => {
    this.load.image(key, `res/${key}.png`);
    this.load.image(`portrait${i}`, `res/portrait${i+1}.png`);
  });
}

function create() {
  this.add.image(270, 480, 'background');
  currentCharacter = this.add.sprite(270, 470, characters[currentIndex]).setScale(0.7);

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

  updateCharacterUI.call(this, characterData[currentIndex]);
}

function switchCharacter(index) {
  if (switching || index === currentIndex) return;
  switching = true;

  if (nameText) nameText.destroy();
  statTexts.forEach(text => text.destroy());
  statTexts = [];

  const newChar = this.add.sprite(540 + 200, 470, characters[index]).setScale(0.7);
  this.tweens.add({
    targets: currentCharacter,
    x: -200,
    duration: 400,
    ease: 'Cubic.easeIn',
    onComplete: () => currentCharacter.destroy()
  });

  this.tweens.add({
    targets: newChar,
    x: 270,
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

      updateCharacterUI.call(this, characterData[index], () => {
        switching = false;
      });
    }
  });

  currentIndex = index;
}

function updateCharacterUI(data, onComplete) {
  const fadeDuration = 200;

  if (nameText) nameText.destroy();
  statTexts.forEach(text => text.destroy());
  statTexts = [];

  nameText = this.add.text(270, 40, data.name, {
    fontSize: '42px',
    fontFamily: 'Inter',
    color: '#ffd700',
    align: 'center',
    shadow: {
      offsetX: 2,
      offsetY: 2,
      color: '#000000',
      blur: 4,
      fill: true
    }
  }).setOrigin(0.5).setAlpha(0);

  this.tweens.add({
    targets: nameText,
    alpha: 1,
    duration: fadeDuration
  });

  this.tweens.add({
    targets: nameText,
    y: '+=5',
    duration: 800,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  const stats = Object.entries(data.stats);
  stats.forEach(([label, value], i) => {
    const labelText = this.add.text(20, 100 + i * 30, `${label}:`, {
      fontSize: '26px',
      fontFamily: 'Inter',
      color: '#ffffff',
      align: 'left',
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#000000',
        blur: 3,
        fill: true
      }
    }).setAlpha(0).setTint(0xffcc00);
    
    const stars = this.add.text(240, 100 + i * 30, '★'.repeat(value) + '☆'.repeat(5 - value), {
      fontSize: '26px',
      fontFamily: 'Inter',
      color: '#ffffff',
      align: 'left',
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#000000',
        blur: 3,
        fill: true
      }
    }).setAlpha(0).setTint(0xff6f61); // salmon tone;
    
    this.tweens.add({ targets: labelText, alpha: 1, duration: fadeDuration });
    this.tweens.add({ targets: stars, alpha: 1, duration: fadeDuration });
    
    statTexts.push(labelText, stars);    
  });

  // Callback after text appears
  this.time.delayedCall(fadeDuration + 100, () => {
    if (typeof onComplete === 'function') onComplete();
  });
}
