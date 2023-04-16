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
    this.margin = 20;
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
      title: !!this.sprint ? "Sprint Planning" : "Product Backlog",
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
          this.centreX,
          50,
          `The team think they can achieve\n${this.sprint.commitment} points this sprint.`,
          theme.h3
        )
        .setOrigin(0.5, 0);
    }
  }

  displayBacklog() {
    this.backlog = new Backlog(
      this,
      this.margin,
      100,
      this.width - this.margin * 2,
      400,
      {
        project: this.project,
        team: this.team,
        commitment: this.sprint && this.sprint.commitment,
        emitter: this.emitter,
      }
    );
  }

  displayHelpText() {
    this.add
      .text(
        this.centreX,
        this.height - this.margin,
        `* Use the arrow keys on your keyboard to scroll the backlog.\n\nUse the arrow icons to move an item one space or move it to the top of the backlog.\n\nDrag and drop an item to move it to any position.`,
        {
          ...theme.mediumText,
          wordWrap: {
            width: this.width - this.margin * 2,
            useAdvancedWrap: false,
          },
        }
      )
      .setOrigin(0.5, 1);
  }

  getEstimateText(item) {
    return item.estimate || "n/a";
  }
}
