// === UI Builders ===

function createProgressBar(scene, x, y, width, height, percentage) {
  const bg = scene.add.graphics();
  bg.fillStyle(0x333333, 1);
  bg.fillRoundedRect(0, 0, width, height, 8);

  const fg = scene.add.graphics();
  fg.fillStyle(0x00cc66, 1);
  fg.fillRoundedRect(0, 0, (width * percentage) / 100, height, 8);

  return scene.add.container(x, y, [bg, fg]);
}

function createPassCard(scene, pass, y, container) {
  const image = scene.add.image(GAME_WIDTH / 2, y, pass.image);
  container.add(image);

  if (pass.unlocked) {
    image.setInteractive().on('pointerdown', () => {
      prepareTransition(scene, 'PassDetailsScene', { pass });
    });

    const progress = Math.floor((pass.tasksDone / pass.tasksMax) * 100);

    const progressLabel = scene.add.text(image.x, image.y, `CONTINUAR PROGRESO: ${progress}%`, DETAILS_STYLE)
      .setOrigin(0.39, -8.3)
    container.add(progressLabel);

    const progressBar = createProgressBar(scene, GAME_WIDTH / 2 - PROGRESS_BAR_WIDTH / 2 + 40, image.y + 160, PROGRESS_BAR_WIDTH, PROGRESS_BAR_HEIGHT, progress);
    container.add(progressBar);
  } else {
    image.disableInteractive();
  }

}

// === Scene ===

class LobbyScene extends Phaser.Scene {
  constructor() {
    super('LobbyScene');
  }

  preload() {
    this.load.image('logo', 'res/kampeLogo.png');
    this.load.image('passCard1', 'res/passCard1.png');
    this.load.image('passCard2', 'res/passCard2.png');
    this.load.image('passCard3', 'res/passCard3.png');
    this.load.image('passCard4', 'res/passCard4.png');
    this.load.font(FONT_TYPE, 'res/Panchang-Medium.otf', 'opentype');
    this.load.font(FONT_TYPE_BOLD, 'res/Panchang-Semibold.otf', 'opentype');
  }

  create() {
    this.cameras.main.setAlpha(0);
      this.tweens.add({
        targets: this.cameras.main,
        alpha: 1,
        duration: FADING_TIME
      });

    const container = this.add.container(0, 0);
    const spacing = 500;
    const topMargin = 680;

    const scaleFactor = this.scale.displayScale.x;
    const imageLogo = this.add.image(GAME_WIDTH / 2, 120, 'logo');
    container.add(imageLogo);

    const title = this.add.text(this.cameras.main.centerX, 280, "TUS PLANES", TITLE_STYLE)
      .setOrigin(0.5)
      .setShadow(4, 4, '#000000', 0, true, true)
      .setResolution(window.devicePixelRatio);
    container.add(title);

    const subtitle = this.add.text(this.cameras.main.centerX, 390, "Consigue tus objetivos profesionales gracias a los planes de Kämpe. ¡Ánimo!", SUBTITLE_STYLE)
      .setOrigin(0.5)
      .setShadow(4, 4, '#000000', 0, true, true);
    container.add(subtitle);

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