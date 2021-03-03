import Phaser from "phaser";
import { Dev } from "../classes/Employee";

export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  init() {
    console.log(this.registry.get("company"));
    this.employees = Array(5)
      .fill(null)
      .map(() => new Dev());
    console.log(this.employees);
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
