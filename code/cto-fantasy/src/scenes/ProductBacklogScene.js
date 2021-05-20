import Phaser from "phaser";
import { Backlog } from "../game-objects/Backlog";
import * as theme from "../theme";

export class ProductBacklogScene extends Phaser.Scene {
  constructor() {
    super("ProductBacklogScene");
  }

  init() {}

  preload() {}

  create({ project, sprint, emitter, onClose }) {
    this.project = project;
    this.sprint = sprint;
    this.emitter = emitter;
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

    if (this.sprint) {
      this.header = this.add
        .text(400, 15, "Sprint Planning", theme.h1)
        .setOrigin(0.5, 0);
    }
    this.close = this.add
      .image(760, 20, "complete_icon")
      .setOrigin(0.5, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.onClose();
      });
  }

  displayCommitment() {
    if (this.sprint) {
      this.add
        .text(
          400,
          50,
          `The team think they can achieve ${this.sprint.commitment} points this sprint.`,
          theme.mainText
        )
        .setOrigin(0.5, 0);
    }
  }

  displayBacklog() {
    this.backlog = new Backlog(this, 100, 100, {
      project: this.project,
      team: this.team,
      commitment: this.sprint && this.sprint.commitment,
      emitter: this.emitter,
    });
  }

  getEstimateText(item) {
    return item.estimate || "n/a";
  }

  //update(time, delta) {}
}
