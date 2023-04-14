import Phaser from "phaser";
import { Backlog } from "../game-objects/Backlog";
import { SceneBackground } from "../game-objects/SceneBackground";
import * as theme from "../theme";

export class ProductBacklogScene extends Phaser.Scene {
  constructor() {
    super("ProductBacklogScene");
  }

  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    this.centreX = this.width / 2;
    this.centreY = this.height / 2;
  }

  preload() {}

  create({ project, sprint, emitter, onClose }) {
    this.project = project;
    this.sprint = sprint;
    this.emitter = emitter;
    this.onClose = onClose;
    this.createComponents();
    this.createEvents();
    this.displayCommitment();
    this.displayBacklog();
    this.displayHelpText();
  }

  update() {
    this.backlog.update();
  }

  createComponents() {
    this.background = new SceneBackground(this, 0, 0, this.width, this.height, {
      title: !!this.sprint && "Sprint Planning",
      closeIcon: "complete_icon",
      onClose: () => {
        this.selectCommitment();
        this.onClose();
      },
    });
  }

  createEvents() {
    this.input.keyboard.on("keydown", (event) => {
      if (event.key === "Enter") {
        this.selectCommitment();
        this.onClose();
      }
    });
  }

  selectCommitment() {
    if (this.sprint) {
      const items = this.backlog.getCommittedItems();
      this.emitter.emit("sprint_backlog_selected", items);
    }
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

  displayHelpText() {
    this.add
      .text(
        400,
        540,
        `* Use the arrow keys on your keyboard to scroll the backlog.\nUse the arrow icons to move an item one space or move it to the top of the backlog.\nDrag and drop an item to move it to any position.`,
        { ...theme.mediumText, align: "center" }
      )
      .setOrigin(0.5, 0);
  }

  getEstimateText(item) {
    return item.estimate || "n/a";
  }

  //update(time, delta) {}
}
