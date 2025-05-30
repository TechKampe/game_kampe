import Phaser from 'phaser';
import { GAME_WIDTH, FONT_TYPE_BOLD, PHASE_TITLE_STYLE, PHASE_DESCRIPTION_STYLE, PHASE_CARD_SPACING, TITLE_SPACING, PROGRESS_VALUE_STYLE, PROGRESS_STYLE, RARITY_STYLE, REWARD_RARITY_COLOR, BLANK_BUTTON_STYLE } from '../constants.js';
import { loadTransition, createProgressBar, enableScroll, prepareTransition, addBackButton } from '../utils.js';

class PassDetailsScene extends Phaser.Scene {
  constructor() {
    super('PassDetailsScene');
  }

  preload() {
    this.load.image('phasesTitle', 'res/phasesTitle.png');
    this.load.font(FONT_TYPE_BOLD, 'res/Panchang-Semibold.otf', 'opentype');
    this.load.image('phaseCard', 'res/phaseCard.png');
    for (let i = 1; i <= 20; i++) {
      const num = i.toString().padStart(3, '0');
      this.load.image(`res/reward_${num}.png`, `res/reward_${num}.png`);
    }
    this.load.image('avatar1', 'res/avatar1.png');
    this.load.image('avatar2', 'res/avatar2.png');
    this.load.image('avatar3', 'res/avatar3.png');
    this.load.image('avatar4', 'res/avatar4.png');
  }

  create(data) {
    loadTransition(this);

    const { pass } = data;
    const container = this.add.container(0, 0);

    addBackButton(this, 'LobbyScene');

    const imageTitle = this.add.image(GAME_WIDTH / 2, 250, 'phasesTitle');
    container.add(imageTitle);

    pass.phases.forEach((phase, i) => {
      const y = TITLE_SPACING + i * PHASE_CARD_SPACING;
      this.createPhaseCard(container, i + 1, phase, y);
    });

    enableScroll(this, container, TITLE_SPACING + PHASE_CARD_SPACING * pass.phases.length - PHASE_CARD_SPACING / 2);
  }

  createPhaseCard(container, row, phase, y) {
    const card = this.createInfoLabels(y, container, phase, row);

    // Rewards
    this.createRewards(y, phase, container);

    // Buttons
    this.createButtons(card, y, phase, container);
  }

  createButtons(card, y, phase, container) {
    const viewAllButton = this.createButton(card.x + 450, y + 175, '      ');
    const showTasksButton = this.createButton(card.x + 340, y + 25, '                          ');
    showTasksButton.on('pointerup', () => {
      prepareTransition(this, 'TasksScene', { phase });
    });

    container.add(viewAllButton);
    container.add(showTasksButton);
  }

  createRewards(y, phase, container) {
    const rewardSpacing = 225;
    const startX = 133;
    const rewardsY = y + 170;

    phase.rewards.forEach((reward, index) => {
      const rewardX = startX + index * rewardSpacing;
      const rewardIcon = this.add.image(rewardX, rewardsY, reward.image).setOrigin(0.5);

      const label = this.add.text(rewardX, rewardsY + 80, reward.rarity.toUpperCase(), RARITY_STYLE).setShadow(1, 1, '#008671', 0, true, true).setColor(REWARD_RARITY_COLOR[reward.rarity.toUpperCase()] || '#FFFFFF').setOrigin(0.5);

      container.add(rewardIcon);
      container.add(label);
    });
  }

  createInfoLabels(y, container, phase, row) {
    const card = this.add.image(GAME_WIDTH / 2, y, 'phaseCard');
    container.add(card);

    const title = this.add.text(card.x - 490, y - 250, phase.title.toUpperCase(), PHASE_TITLE_STYLE).setShadow(2, 2, '#000000', 0, true, true);
    container.add(title);

    const description = this.add.text(card.x - 490, y - 180 , phase.description.toUpperCase(), PHASE_DESCRIPTION_STYLE).setShadow(2, 2, '#000000', 0, true, true);
    container.add(description);

    const avatar = this.add.image(card.x + 350, y - 143, `avatar${row % 4 +1}`);
    container.add(avatar);

    const progressValueLabel = this.add.text(card.x - 490, y - 35, `${phase.tasksDone} / ${phase.tasksTotal}`, PROGRESS_VALUE_STYLE).setShadow(2, 2, '#000000', 0, true, true);
    container.add(progressValueLabel);

    const progressLabel = this.add.text(progressValueLabel.x + progressValueLabel.width + 20, y - 35, `TAREAS COMPLETADAS`, PROGRESS_STYLE).setShadow(1, 1, '#008671', 0, true, true);
    container.add(progressLabel);

    const progressPercent = Math.floor((phase.tasksDone / phase.tasksTotal) * 100);
    container.add(createProgressBar(this, card.x - 490 - 5, y - 0, 580, 20, progressPercent));
    return card;
  }

  createButton(x, y, text) {
    return this.add.text(x, y, text, BLANK_BUTTON_STYLE).setOrigin(0.5).setInteractive();
  }

}

window.PassDetailsScene = PassDetailsScene;
