import Phaser from "phaser";
import { SceneBackground } from "../game-objects/SceneBackground";

export class EndScene extends Phaser.Scene {
  intro = true;
  constructor() {
    super("EndScene");
  }

  init() {}

  preload() {}

  create(params) {
    console.log(Object.keys(params));
    this.createComponents();
  }

  createComponents() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const name = this.registry.get("name");
    const company = this.registry.get("company");
    const title = "Plorg";

    this.intro = false;
    this.background = new SceneBackground(this, 0, 0, width, height, {
      title,
    });
  }
}
