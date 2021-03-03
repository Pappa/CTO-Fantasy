import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  init() {}

  // load assets
  preload() {
    this.load.image("button", "assets/UIpack/PNG/blue_button00.png");
    this.load.image("menu", "assets/UIpack/PNG/grey_panel.png");
  }

  // executed once, after assets were loaded
  create() {
    this.scene.start("VacanciesScene");
  }
}
