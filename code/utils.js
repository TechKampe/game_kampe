function loadTransition(object) {
    object.cameras.main.setAlpha(0);
    object.tweens.add({
        targets: object.cameras.main,
        alpha: 1,
        duration: FADING_TIME
    });
}

function unloadTransition(object, targetScene) {
    object.scene.transition({
        target: targetScene,
        duration: FADING_TIME,
        moveBelow: true,
        onUpdate: (progress) => {
          object.cameras.main.setAlpha(1 - progress); // fade out current
        }
      });
}

function prepareTransition(object, targetScene, payload) {
    object.scene.transition({
        target: targetScene,
        duration: FADING_TIME,
        data: payload,
        moveBelow: true,
        onUpdate: (progress) => {
            object.cameras.main.setAlpha(1 - progress); // fade out current
        }
      });
}

function createProgressBar(scene, x, y, width, height, percentage) {
    const bg = scene.add.graphics();
    bg.fillStyle(0x008671, 1);
    bg.fillRoundedRect(0, 0, width, height, 8);
  
    const fg = scene.add.graphics();
    fg.fillStyle(0x002253, 1);
    fg.fillRoundedRect(0, 0, (width * percentage) / 100, height, 8);
  
    return scene.add.container(x, y, [bg, fg]);
  }

  function enableScroll(scene, container, totalHeight) {
    const maxScroll = Math.max(0, totalHeight - GAME_HEIGHT);
    let isDragging = false;
    let dragStartY = 0;
    let containerStartY = 0;

    scene.input.on('pointerdown', (pointer) => {
      isDragging = true;
      dragStartY = pointer.y;
      containerStartY = container.y;
    });

    scene.input.on('pointerup', () => {
      isDragging = false;
    });

    scene.input.on('pointermove', (pointer) => {
      if (isDragging) {
        const delta = pointer.y - dragStartY;
        container.y = Phaser.Math.Clamp(containerStartY + delta, -maxScroll, 0);
      }
    });

    scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
      container.y = Phaser.Math.Clamp(container.y - deltaY * 0.5, -maxScroll, 0);
    });
  }