import Phaser from "phaser";
import * as theme from "../theme";

export class SprintReviewScene extends Phaser.Scene {
  constructor() {
    super("SprintReviewScene");
  }

  init() {}

  preload() {}

  create({ results, onClose }) {
    console.log("results", results);
    this.results = results;
    this.onClose = onClose;
    this.createComponents();
  }

  createComponents() {
    this.header = this.add
      .text(400, 15, "Sprint review", theme.h1)
      .setOrigin(0.5, 0);
    this.close = this.add
      .text(760, 15, "X", theme.x)
      .setOrigin(0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.onClose();
      });
  }

  update(time, delta) {}
}
