import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, FONT_TYPE_BOLD, DETAILS_STYLE, PROGRESS_BAR_WIDTH, LOBBY_CARD_SPACING, TITLE_SPACING, PROGRESS_BAR_HEIGHT, PHASE_DESCRIPTION_STYLE } from '../constants.js';
import { loadTransition, createProgressBar, enableScroll, prepareTransition } from '../utils.js';
import { loadCareerPasses } from '../data.js';

// === UI Builders ===

function createPassCard(scene, pass, y, container) {
  const image = scene.add.image(GAME_WIDTH / 2, y, pass.image);
  container.add(image);

  if (pass.unlocked) {
    image.setInteractive().on('pointerdown', () => {
      prepareTransition(scene, 'PassDetailsScene', { pass });
    });

    const progress = Math.floor((pass.tasksDone / pass.tasksMax) * 100);

    const progressLabel = scene.add.text(image.x - 225, image.y + 160, `CONTINUAR PROGRESO: ${progress}%`, DETAILS_STYLE)
    container.add(progressLabel);

    const progressBar = createProgressBar(scene, image.x - 225, image.y + 193, PROGRESS_BAR_WIDTH, PROGRESS_BAR_HEIGHT, progress);
    container.add(progressBar);
  } else {
    image.disableInteractive();
  }

}

// === Scene ===

function getUserIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("param");
}

class LobbyScene extends Phaser.Scene {
  constructor() {
    super('LobbyScene');
  }

  preload() {
    this.load.image('lobbyTitle', 'res/lobbyTitle.png');
    this.load.image('passCard1', 'res/passCard1.png');
    this.load.image('passCard2', 'res/passCard2.png');
    this.load.image('passCard3', 'res/passCard3.png');
    this.load.image('passCard4', 'res/passCard4.png');
    this.load.font(FONT_TYPE_BOLD, 'res/Panchang-Semibold.otf', 'opentype');
  }

  create() {
    const userId = getUserIdFromUrl();
    if (!userId) {
      this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, "Usuario no encontrado", PHASE_DESCRIPTION_STYLE).setOrigin(0.5);
      return;
    }

    loadCareerPasses(userId).then((careerPasses) => {
      // TODO: Add actual logic to filter unlocked passes
      if (careerPasses[0].tasksMax === 0) {
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, "El usuario no tiene un plan asignado todavía", PHASE_DESCRIPTION_STYLE).setOrigin(0.5);
        return;
      }
      
      loadTransition(this);

      const container = this.add.container(0, 0);
      const spacing = LOBBY_CARD_SPACING;
      const topMargin = TITLE_SPACING;

      const imageTitle = this.add.image(GAME_WIDTH / 2, 250, 'lobbyTitle');
      container.add(imageTitle);

      careerPasses.forEach((pass, i) => {
        const y = topMargin + i * spacing;
        createPassCard(this, pass, y, container);
      });

      enableScroll(this, container, topMargin + spacing * careerPasses.length - spacing / 2);
    });
  }
}

window.LobbyScene = LobbyScene;