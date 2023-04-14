import Phaser from "phaser";
import { SceneBackground } from "../game-objects/SceneBackground";
import * as theme from "../theme";
import { intersperse } from "../utils/collection";
import { getPriorityText } from "../utils/customer";

export class CustomerScene extends Phaser.Scene {
  constructor() {
    super("CustomerScene");
  }

  init() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    this.centreX = this.width / 2;
    this.centreY = this.height / 2;
  }

  preload() {}

  create({ customer, project, emitter, onClose }) {
    this.customer = customer;
    this.project = project;
    this.emitter = emitter;
    this.onClose = onClose;
    this.createComponents();
    this.createEvents();
    this.displayCustomerPriorities();
  }

  createComponents() {
    this.background = new SceneBackground(this, 0, 0, this.width, this.height, {
      title: "Customer",
      closeIcon: "close_icon",
      onClose: () => {
        this.onClose();
      },
    });

    this.priorityText = this.add
      .text(400, 150, "", {
        ...theme.mainText,
        wordWrap: { width: 450, useAdvancedWrap: true },
      })
      .setOrigin(0.5, 0);
  }

  createEvents() {
    this.input.keyboard.on("keydown", (event) => {
      if (event.key === "Enter") {
        this.onClose();
      }
    });
  }

  displayCustomerPriorities() {
    const priorities = intersperse(
      this.customer.priorities.map(getPriorityText),
      [" ", " ", " "]
    ).flat();
    this.priorityText.setText(priorities);
  }
}
