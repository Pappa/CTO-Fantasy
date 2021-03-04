import Phaser from "phaser";
import { Dev } from "../classes/Employee";

export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  init() {
    const teamSize = this.registry.get("settings").startingTeamSize;
    this.employees = Array(teamSize)
      .fill(null)
      .map(() => new Dev());
  }

  // load assets
  preload() {
    // this.load.image("background", "assets/images/background-city.png");
    // this.load.audio("treeAudio", "assets/audio/arbol.mp3");
  }

  // executed once, after assets were loaded
  create() {
    console.log(this.employees);
  }

  update(time, delta) {}
}
