function createPassCard(scene, pass, y, container) {
  const image = scene.add.image(GAME_WIDTH / 2, y, 'passCard').setDisplaySize(360, 210);
  container.add(image);

  const passTitleText = scene.add.text(image.x, image.y, pass.title.toUpperCase(), {
    fontSize: '25px',
    fontFamily: 'BurbankBigCondensed',
    color: '#F7D810',
    align: 'center',
    wordWrap: { width: 180, useAdvancedWrap: true },
  }).setOrigin(0.12, 0.7).setResolution(window.devicePixelRatio).setShadow(3, 3, SHADOW_COLOR, 0, true, true);

  container.add(passTitleText);

  if (pass.unlocked) {
    image.setInteractive().on('pointerdown', () => {
      alert(`Accediendo a: ${pass.title}`);
    });

    const progress = Math.floor((pass.tasksDone / pass.tasksMax) * 100);
    const detailsPassText = scene.add.text(image.x, image.y, `CONTINUAR PROGRESO: ${progress}%`, {
      fontSize: '23px',
      fontFamily: 'BurbankBigCondensed',
      color: '#003466',
      align: 'center',
    }).setOrigin(0.5, -1.7).setResolution(window.devicePixelRatio);
  
    container.add(detailsPassText);

    // Draw progress bar below the label
    const progressBar = createProgressBar(scene, GAME_WIDTH / 2 - PROGRESS_BAR_WIDTH/2, image.y + 72, PROGRESS_BAR_WIDTH, PROGRESS_BAR_HEIGHT, progress);
    container.add(progressBar);
  }
  else{
    image.setTint(0x999999); // grey tint
    image.disableInteractive(); // block interaction

    passTitleText.setColor('#998101');
    const askPassText = scene.add.text(image.x, image.y, "SOLICITAR PASE", {
      fontSize: '35px',
      fontFamily: 'BurbankBigCondensed',
      color: '#003466',
      align: 'center',
    }).setOrigin(0.5, -1.05).setResolution(window.devicePixelRatio).setShadow(2, 2, SHADOW_COLOR, 0, true, true);
  
    container.add(askPassText);

    const imageLock = scene.add.image(GAME_WIDTH / 2, y, 'lock').setDisplaySize(80, 80);
    imageLock.setTint(0x999999); // grey tint
    container.add(imageLock);
  }
}

function createProgressBar(scene, x, y, width, height, percentage) {
  const background = scene.add.graphics();
  background.fillStyle(0x333333, 1);
  background.fillRoundedRect(0, 0, width, height, 4);

  const bar = scene.add.graphics();
  bar.fillStyle(0x00cc66, 1);
  bar.fillRoundedRect(0, 0, (width * percentage) / 100, height, 4);

  // Place both graphics in a sub-container so they move together
  const barContainer = scene.add.container(x, y, [background, bar]);

  return barContainer;
}

class LobbyScene extends Phaser.Scene {
  constructor() {
    super('LobbyScene');
  }

  preload() {
    this.load.image('passCard', 'res/passCard.png');
    this.load.image('lock', 'res/lock.png');
    this.load.font('BurbankBigCondensed', 'res/BurbankBigCondensed-Black.otf', 'opentype');
  }

  create() {
    const container = this.add.container(0, 0);
    const spacing = 250;
    const topMargin = 200;
  
    console.log('devicePixelRatio:', window.devicePixelRatio);

    const titleText = this.add.text(this.cameras.main.centerX, 40, "PASES DE CARRERA", {
      fontSize: '45px',
      fontFamily: 'BurbankBigCondensed',
      color: '#ffffff',
      align: 'center',
    }).setOrigin(0.5).setResolution(window.devicePixelRatio).setShadow(4, 4, SHADOW_COLOR, 0, true, true);
    titleText.setScrollFactor(1); // scrolls with the camera

    container.add(titleText);

    // Add the career pass cards
    careerPasses.forEach((pass, i) => {
      const y = topMargin + i * spacing;
      createPassCard(this, pass, y, container);
    });
  
    // Scroll bounds
    const totalHeight = topMargin + spacing * careerPasses.length;
    const maxScroll = Math.max(0, totalHeight - GAME_HEIGHT);
  
    // Enable dragging
    let isDragging = false;
    let dragStartY = 0;
    let containerStartY = 0;
  
    this.input.on('pointerdown', (pointer) => {
      isDragging = true;
      dragStartY = pointer.y;
      containerStartY = container.y;
    });
  
    this.input.on('pointerup', () => {
      isDragging = false;
    });
  
    this.input.on('pointermove', (pointer) => {
      if (isDragging) {
        let delta = pointer.y - dragStartY;
        container.y = Phaser.Math.Clamp(containerStartY + delta, -maxScroll, 0);
      }
    });
  
    // Fallback for mouse wheel
    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
      container.y -= deltaY * 0.5;
      container.y = Phaser.Math.Clamp(container.y, -maxScroll, 0);
    });
  }
  
}

window.LobbyScene = LobbyScene;