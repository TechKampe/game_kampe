class TasksScene extends Phaser.Scene {
  constructor() {
    super('TasksScene');
  }

  preload() {
    this.load.image('check_on', 'res/check_on.png');
    this.load.image('check_off', 'res/check_off.png');
    this.load.image('xp_empleabilidad', 'res/xp_empleabilidad.png');
    this.load.image('xp_formacion', 'res/xp_formacion.png');
    this.load.image('xp_comunidad', 'res/xp_comunidad.png');
  }

  create(data) {
    const { phase } = data;
    const container = this.add.container(0, 0);
    const spacing = 100;
    const topMargin = 180;

    // TITLE + PROGRESS
    const title = this.add.text(GAME_WIDTH / 2, 40, phase.title.toUpperCase(), {
      fontSize: '32px',
      fontFamily: 'BurbankBigCondensed',
      color: '#FFD700'
    }).setOrigin(0.5);
    container.add(title);

    const progressLabel = this.add.text(GAME_WIDTH / 2, 90, `${phase.tasksDone}/${phase.tasksTotal} TAREAS COMPLETADAS`, {
      fontSize: '20px',
      fontFamily: 'BurbankBigCondensed',
      color: '#ffffff'
    }).setOrigin(0.5);
    container.add(progressLabel);

    // Progress Bar
    const barWidth = 250;
    const barHeight = 12;
    const barX = (GAME_WIDTH - barWidth) / 2;
    const barY = 120;
    const progressPercent = phase.tasksDone / phase.tasksTotal;

    const bgBar = this.add.graphics();
    bgBar.fillStyle(0x008866, 1);
    bgBar.fillRoundedRect(barX, barY, barWidth, barHeight, 6);

    const fgBar = this.add.graphics();
    fgBar.fillStyle(0x33FFCC, 1);
    fgBar.fillRoundedRect(barX, barY, barWidth * progressPercent, barHeight, 6);

    container.add(bgBar);
    container.add(fgBar);

    // TASK LIST
    phase.tasks.forEach((task, index) => {
      const y = topMargin + index * spacing;
      this.createTaskCard(container, task, y);
    });

    const totalHeight = topMargin + phase.tasks.length * spacing;
    const maxScroll = Math.max(0, totalHeight - GAME_HEIGHT);

    // Scroll logic
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

  createTaskCard(container, task, y) {
    const cardX = GAME_WIDTH / 2;
    const cardWidth = 320;
    const cardHeight = 75;
    const isCompleted = task.is_active;
    const bgColor = isCompleted ? 0x008866 : 0x444444;

    const bg = this.add.graphics();
    bg.fillStyle(bgColor, 1);
    bg.fillRoundedRect(0, 0, cardWidth, cardHeight, 10);
    const bgContainer = this.add.container(cardX - cardWidth / 2, y, [bg]);
    container.add(bgContainer);

    // Check icon
    const checkIcon = this.add.image(cardX - 135, y + cardHeight / 2, isCompleted ? 'check_on' : 'check_off')
      .setDisplaySize(24, 24)
      .setOrigin(0.5);
    container.add(checkIcon);

    // Task title
    const title = this.add.text(cardX - 100, y + 20, task.title.toUpperCase(), {
      fontSize: '16px',
      fontFamily: 'BurbankBigCondensed',
      color: '#ffffff',
      wordWrap: { width: 140 }
    });
    container.add(title);

    // XP Icons
    const icons = [
      { key: 'xp_empleabilidad', value: task.reward_xp_empleabilidad },
      { key: 'xp_formacion', value: task.reward_xp_formacion },
      { key: 'xp_comunidad', value: task.reward_xp_comunidad }
    ];

    icons.forEach((icon, i) => {
      const iconX = cardX + 40 + i * 40;
      const img = this.add.image(iconX, y + cardHeight / 2, icon.key).setDisplaySize(30, 30).setOrigin(0.5);
      container.add(img);

      const txt = this.add.text(iconX, y + 53, `${icon.value}`, {
        fontSize: '14px',
        fontFamily: 'BurbankBigCondensed',
        color: '#ffffff'
      }).setOrigin(0.5);
      container.add(txt);
    });
  }
}

window.TasksScene = TasksScene;
