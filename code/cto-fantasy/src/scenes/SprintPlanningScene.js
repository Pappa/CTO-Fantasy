import Phaser from "phaser";
import { Backlog } from "../game-objects/Backlog";
import * as theme from "../theme";

export class SprintPlanningScene extends Phaser.Scene {
  constructor() {
    super("SprintPlanningScene");
  }

  init() {}

  preload() {}

  create({ project, commitment, emitter, onClose }) {
    this.project = project;
    this.commitment = commitment;
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
    this.add
      .text(
        400,
        50,
        `The team think they can achieve ${this.commitment} points this sprint.`,
        theme.mainText
      )
      .setOrigin(0.5, 0);
  }

  displayBacklog() {
    this.backlog = new Backlog(this, 100, 100, {
      project: this.project,
      team: this.team,
      commitment: this.commitment,
      emitter: this.emitter,
    });
  }

  getEstimateText(item) {
    return item.estimate || "n/a";
  }

  //update(time, delta) {}
}
