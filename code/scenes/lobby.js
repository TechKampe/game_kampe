// === UI Builders ===

function createProgressBar(scene, x, y, width, height, percentage) {
  const bg = scene.add.graphics();
  bg.fillStyle(0x333333, 1);
  bg.fillRoundedRect(0, 0, width, height, 4);

  const fg = scene.add.graphics();
  fg.fillStyle(0x00cc66, 1);
  fg.fillRoundedRect(0, 0, (width * percentage) / 100, height, 4);

  return scene.add.container(x, y, [bg, fg]);
}

function createPassCard(scene, pass, y, container) {
  const image = scene.add.image(GAME_WIDTH / 2, y, 'passCard').setDisplaySize(360, 210);
  container.add(image);

  const passTitle = scene.add.text(image.x, image.y, pass.title.toUpperCase(), PASS_TITLE_STYLE)
    .setOrigin(0.12, 0.7)
    .setResolution(window.devicePixelRatio)
    .setShadow(...SHADOW_SETTINGS);
  container.add(passTitle);

  if (pass.unlocked) {
    image.setInteractive().on('pointerdown', () => {
      alert(`Accediendo a: ${pass.title}`);
    });

    const progress = Math.floor((pass.tasksDone / pass.tasksMax) * 100);

    const progressLabel = scene.add.text(image.x, image.y, `CONTINUAR PROGRESO: ${progress}%`, DETAILS_STYLE)
      .setOrigin(0.5, -1.7)
      .setResolution(window.devicePixelRatio);
    container.add(progressLabel);

    const progressBar = createProgressBar(scene, GAME_WIDTH / 2 - PROGRESS_BAR_WIDTH / 2, image.y + 72, PROGRESS_BAR_WIDTH, PROGRESS_BAR_HEIGHT, progress);
    container.add(progressBar);
  } else {
    image.setTint(0x999999);
    image.disableInteractive();
    passTitle.setColor(LOCKED_TITLE_STYLE.color);

    const cta = scene.add.text(image.x, image.y, "SOLICITAR PASE", CTA_STYLE)
      .setOrigin(0.5, -1.05)
      .setResolution(window.devicePixelRatio)
      .setShadow(...SHADOW_SETTINGS);
    container.add(cta);

    const lock = scene.add.image(GAME_WIDTH / 2, y, 'lock').setDisplaySize(80, 80);
    lock.setTint(0x999999);
    container.add(lock);
  }
}

// === Scene ===

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

    const title = this.add.text(this.cameras.main.centerX, 40, "PASES DE CARRERA", TITLE_STYLE)
      .setOrigin(0.5)
      .setResolution(window.devicePixelRatio)
      .setShadow(4, 4, '#000000', 0, true, true);
    container.add(title);

    careerPasses.forEach((pass, i) => {
      const y = topMargin + i * spacing;
      createPassCard(this, pass, y, container);
    });

    const totalHeight = topMargin + spacing * careerPasses.length;
    const maxScroll = Math.max(0, totalHeight - GAME_HEIGHT);

    // === Scroll logic ===
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
        const delta = pointer.y - dragStartY;
        container.y = Phaser.Math.Clamp(containerStartY + delta, -maxScroll, 0);
      }
    });

    this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
      container.y -= deltaY * 0.5;
      container.y = Phaser.Math.Clamp(container.y, -maxScroll, 0);
    });
  }
}

window.LobbyScene = LobbyScene;