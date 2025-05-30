class TasksScene extends Phaser.Scene {
  constructor() {
    super('TasksScene');
  }

  preload() {
    this.load.image('tasksTitle', 'res/tasksTitle.png');
    this.load.image('tasksCard', 'res/tasksCard.png');
    this.load.image('check', 'res/check.png');
  }

  create(data) {
    loadTransition(this);

    const { phase } = data;
    const container = this.add.container(0, 0);

    const TASK_CARD_SPACING = 210;
    const TOP_MARGIN = 750;

    addBackButton(this, 'PassDetailsScene');

    const imageTitle = this.add.image(GAME_WIDTH / 2, 250, 'tasksTitle');
    container.add(imageTitle);

    // TITLE + PROGRESS
    const title = this.add.text(GAME_WIDTH / 2, 470, phase.title.toUpperCase(), TASKS_TITLE_STYLE).setOrigin(0.5);
    container.add(title);

    const progressLabel = this.add.text(GAME_WIDTH / 2, 532, `${phase.tasksDone}/${phase.tasksTotal} TAREAS COMPLETADAS`, TASKS_PROGRESS_LABEL).setOrigin(0.5);
    container.add(progressLabel);

    // Progress Bar
    const progressPercent = Math.floor((phase.tasksDone / phase.tasksTotal) * 100);
    container.add(createProgressBar(this, 150, 575, 785, 20, progressPercent, 0x1E4BCB));

    // TASK LIST
    phase.tasks.forEach((task, index) => {
      const y = TOP_MARGIN + index * TASK_CARD_SPACING;
      this.createTaskCard(container, task, y);
    });

    enableScroll(this, container, TOP_MARGIN + phase.tasks.length * TASK_CARD_SPACING - TASK_CARD_SPACING / 2);
  }

  createTaskCard(container, task, y) {

    const card = this.add.image(GAME_WIDTH / 2, y, 'tasksCard');
    container.add(card);

    const title = this.add.text(150, y - 40, task.title.toUpperCase(), TASK_TITLE_STYLE).setShadow(2, 2, '#000000', 0, true, true);
    container.add(title);

    // Check icon
    if (!task.is_active) {
      const checkIcon = this.add.image(80, y, 'check').setOrigin(0.5);
      container.add(checkIcon);
    }

    // XP Icons
    const icons = [
      { key: 'xp', value: task.reward_xp },
      { key: 'stars', value: task.reward_stars }
    ];

    icons.forEach((icon, i) => {
      const iconX = 748 + i * 240;

      const txt = this.add.text(iconX, y - 0, `${icon.value}`, XP_STYLE).setOrigin(0.5);
      container.add(txt);
    });
  }
}

window.TasksScene = TasksScene;
