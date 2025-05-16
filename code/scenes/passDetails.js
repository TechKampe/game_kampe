class PassDetailsScene extends Phaser.Scene {
    constructor() {
      super('PassDetailsScene');
    }
  
    preload() {
      this.load.image('phaseCard', 'res/phaseCard.png');
    }
  
    create(data) {
      const { pass } = data;
      const container = this.add.container(0, 0);
      const spacing = 360; // vertical space between cards
      const topMargin = 260;
  
      const title = this.add.text(this.cameras.main.centerX, 40, pass.title.toUpperCase(), PASS_DETAILS_TITLE_STYLE)
                        .setOrigin(0.5).setShadow(2, 2, '#000000', 0, true, true);
      container.add(title);
  
      pass.phases.forEach((phase, i) => {
        const y = topMargin + i * spacing;
        this.createPhaseCard(container, phase, y);
      });
  
      const totalHeight = topMargin + spacing * pass.phases.length;
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
          const delta = pointer.y - dragStartY;
          container.y = Phaser.Math.Clamp(containerStartY + delta, -maxScroll, 0);
        }
      });
  
      this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
        container.y -= deltaY * 0.5;
        container.y = Phaser.Math.Clamp(container.y, -maxScroll, 0);
      });
    }
  
    createPhaseCard(container, phase, y) {
      const card = this.add.image(GAME_WIDTH / 2, y, 'phaseCard').setDisplaySize(360, 342);
      container.add(card);
  
      const title = this.add.text(card.x - 150, y - 140, phase.title.toUpperCase(), {
        fontSize: '22px',
        fontFamily: 'BurbankBigCondensed',
        color: '#ffffff',
        align: 'left',
        wordWrap: { width: 150, useAdvancedWrap: true },
      }).setShadow(2, 2, '#000', 0, true, true);
      container.add(title);
  
      const progressLabel = this.add.text(card.x - 155, y - 31, `${phase.tasksDone} / ${phase.tasksTotal}`, {
        fontSize: '17px',
        fontFamily: 'BurbankBigCondensed',
        color: '#00ff66',
      });
      container.add(progressLabel);
  
      const progress = Math.floor((phase.tasksDone / phase.tasksTotal) * 100);
      const progressBar = this.createProgressBar(card.x - 155, y - 8, 310, 14, progress);
      container.add(progressBar);

      // Dummy buttons
      const btn1 = this.add.text(card.x + 140, y + 47, " Ver todas", {
            fontSize: '16px',
            fontFamily: 'BurbankBigCondensed',
            color: '#ffffff',
            backgroundColor: '#0061b5',
            align: 'center',
            wordWrap: { width: 40, useAdvancedWrap: true },
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
        }).setOrigin(0.5).setInteractive();

      const btn2 = this.add.text(card.x, y + 128, "MOSTRAR TAREAS", {
            fontSize: '36px',
            fontFamily: 'BurbankBigCondensed',
            color: '#ffffff',
            backgroundColor: 'transparent',
            align: 'center',
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
        }).setOrigin(0.5).setInteractive();

      container.add(btn1);
      container.add(btn2);
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
  }
  
  window.PassDetailsScene = PassDetailsScene;
  