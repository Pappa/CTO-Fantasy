import Phaser from "phaser";
import * as theme from "../theme";

export class SprintPlanningScene extends Phaser.Scene {
  constructor() {
    super("SprintPlanningScene");
  }

  init() {}

  preload() {}

  create({ project, commitment, onClose }) {
    this.project = project;
    this.commitment = commitment;
    this.onClose = onClose;
    this.createComponents();
    this.displayCommitment();
    this.displayBacklog();
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
      .text(400, 15, "Sprint Planning", theme.h1)
      .setOrigin(0.5, 0);
    this.close = this.add
      .image(760, 20, "close_icon")
      .setOrigin(0.5, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.onClose();
      });
  }

  displayCommitment() {
    this.make
      .text({
        x: 100,
        y: 50,
        text: `The team think they can achieve ${this.commitment} points this sprint.`,
        style: theme.mainText,
      })
      .setOrigin(0);
  }

  displayBacklog() {
    this.project.productBacklog.forEach((item, idx) => {
      this.make
        .text({
          x: 100,
          y: 100 + 25 * (idx + 1),
          text: `${item.title} - estimate ${this.getEstimateText(item)}`,
          style: theme.mainText,
        })
        .setOrigin(0);
    }, this);
  }

  getEstimateText(item) {
    return item.estimate || "n/a";
  }

  //update(time, delta) {}
}
