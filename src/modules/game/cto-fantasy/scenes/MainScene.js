import Phaser from "phaser";

export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  init(...rest) {
    console.log(this.registry.get("company"));
  }

  // load assets
  preload() {
    // this.load.image("background", "assets/images/background-city.png");
    // this.load.audio("treeAudio", "assets/audio/arbol.mp3");
  }

  // executed once, after assets were loaded
  create() {}

  update(time, delta) {}
}
