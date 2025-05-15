const config = {
  type: Phaser.AUTO,
  width: '100%',
  height: '100%',
  backgroundColor: '#0061b5',
  parent: 'game',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [LobbyScene], 
};

new Phaser.Game(config);
