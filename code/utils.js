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