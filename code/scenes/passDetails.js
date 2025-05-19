class PassDetailsScene extends Phaser.Scene {
  constructor() {
    super('PassDetailsScene');
  }

  preload() {
    this.load.image('phaseCard', 'res/phaseCard.png');
    for (let i = 1; i <= 12; i++) {
      const num = i.toString().padStart(3, '0');
      this.load.image(`res/reward_${num}.png`, `res/reward_${num}.png`);
    }
  }

  create(data) {
    const { pass } = data;
    const container = this.add.container(0, 0);

    const backButton = this.add.text(20, 20, '← VOLVER', {
      fontSize: '20px',
      fontFamily: 'BurbankBigCondensed',
      color: '#ffffff',
      backgroundColor: '#0061b5',
      padding: { left: 10, right: 10, top: 5, bottom: 5 },
    })
      .setInteractive()
      .setOrigin(0, 0)
      .setShadow(2, 2, '#000000', 0, true, true);
    
    backButton.on('pointerdown', () => {
    this.scene.start('LobbyScene');
    });
    const title = this.add.text(this.cameras.main.centerX, 40, pass.title.toUpperCase(), PASS_DETAILS_TITLE_STYLE)
      .setOrigin(0.5)
      .setShadow(2, 2, '#000000', 0, true, true);
    container.add(title);

    pass.phases.forEach((phase, i) => {
      const y = PHASE_CARD_TOP_MARGIN + i * PHASE_CARD_SPACING;
      this.createPhaseCard(container, phase, y);
    });

    this.enableScroll(container, PHASE_CARD_TOP_MARGIN + PHASE_CARD_SPACING * pass.phases.length);
  }

  createPhaseCard(container, phase, y) {
    const card = this.add.image(GAME_WIDTH / 2, y, 'phaseCard').setDisplaySize(PHASE_CARD_WIDTH, PHASE_CARD_HEIGHT);
    container.add(card);

    const title = this.add.text(card.x - 150, y - 140, phase.title.toUpperCase(), {
      fontSize: '22px',
      fontFamily: 'BurbankBigCondensed',
      color: '#ffffff',
      wordWrap: { width: 150, useAdvancedWrap: true }
    }).setShadow(2, 2, '#000', 0, true, true);
    container.add(title);

    const progressLabel = this.add.text(card.x - 155, y - 31, `${phase.tasksDone} / ${phase.tasksTotal}`, {
      fontSize: '17px',
      fontFamily: 'BurbankBigCondensed',
      color: '#00ff66'
    });
    container.add(progressLabel);

    const progressPercent = Math.floor((phase.tasksDone / phase.tasksTotal) * 100);
    container.add(this.createProgressBar(card.x - 155, y - 8, 310, 14, progressPercent));

    // Rewards
    const rewardSpacing = 68;
    const startX = card.x - 25 - (phase.rewards.length - 1) * rewardSpacing / 2;
    const rewardsY = y + 47;

    phase.rewards.forEach((reward, index) => {
      const rewardX = startX + index * rewardSpacing;
      const rewardIcon = this.add.image(rewardX, rewardsY, reward.image).setDisplaySize(55, 55).setOrigin(0.5);
      const label = this.add.text(rewardX, rewardsY + 40, reward.rarity.toUpperCase(), {
        fontSize: '12px',
        fontFamily: 'BurbankBigCondensed',
        color: REWARD_RARITY_COLOR[reward.rarity.toUpperCase()] || '#FFFFFF',
        align: 'center'
      }).setOrigin(0.5);

      container.add(rewardIcon);
      container.add(label);
    });

    // Buttons
    const viewAllButton = this.createButton(card.x + 140, y + 47, ' Ver todas', '16px', '#0061b5');
    const showTasksButton = this.createButton(card.x, y + 128, 'MOSTRAR TAREAS', '36px', 'transparent');
      showTasksButton.on('pointerup', () => {
        this.scene.start('TasksScene', { phase });
      });

    container.add(viewAllButton);
    container.add(showTasksButton);
  }

  createProgressBar(x, y, width, height, percentage) {
    const bg = this.add.graphics();
    bg.fillStyle(0x0061b5, 1);
    bg.fillRoundedRect(0, 0, width, height, 4);

    const fg = this.add.graphics();
    fg.fillStyle(0x57BE70, 1);
    fg.fillRoundedRect(0, 0, (width * percentage) / 100, height, 4);

    return this.add.container(x, y, [bg, fg]);
  }

  createButton(x, y, text, fontSize, backgroundColor) {
    return this.add.text(x, y, text, {
      fontSize,
      fontFamily: 'BurbankBigCondensed',
      color: '#ffffff',
      backgroundColor,
      align: 'center',
      padding: { left: 10, right: 10, top: 5, bottom: 5 }
    }).setOrigin(0.5).setInteractive();
  }

  enableScroll(container, totalHeight) {
    const maxScroll = Math.max(0, totalHeight - GAME_HEIGHT);
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
      container.y = Phaser.Math.Clamp(container.y - deltaY * 0.5, -maxScroll, 0);
    });
  }
}

window.PassDetailsScene = PassDetailsScene;
