import Phaser from "phaser";
import * as theme from "../theme";

export class SprintReviewScene extends Phaser.Scene {
  constructor() {
    super("SprintReviewScene");
  }

  init() {}

  preload() {}

  create({ results, onClose }) {
    this.results = results;
    this.onClose = onClose;
    this.createComponents();
    this.displayResults();
  }

  createComponents() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.background = this.add
      .graphics()
      .fillStyle(0x222222, 1.0)
      .lineStyle(1, 0xffffff, 1.0)
      .fillRoundedRect(10, 10, width - 20, height - 20)
      .strokeRoundedRect(10, 10, width - 20, height - 20);

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

  displayResults() {
    Object.entries(this.results).forEach(([k, v], idx) => {
      this.make
        .text({
          x: 100,
          y: 50 + 20 * (idx + 1),
          text: `${k}: ${v}`,
          style: theme.mainText,
        })
        .setOrigin(0);
    }, this);
  }

  //update(time, delta) {}
}
