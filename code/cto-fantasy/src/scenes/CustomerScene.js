import Phaser from "phaser";
import * as theme from "../theme";
import { intersperse } from "../utils/collection";
import { getPriorityText } from "../utils/customer";

export class CustomerScene extends Phaser.Scene {
  constructor() {
    super("CustomerScene");
  }

  init() {}

  preload() {}

  create({ customer, project, emitter, onClose }) {
    this.customer = customer;
    this.project = project;
    this.emitter = emitter;
    this.onClose = onClose;
    this.createComponents();
    this.displayCustomerPriorities();
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
      .text(400, 15, "Customer", theme.h1)
      .setOrigin(0.5, 0);

    this.priorityText = this.add
      .text(400, 150, "", {
        ...theme.mainText,
        wordWrap: { width: 450, useAdvancedWrap: true },
      })
      //.setTextBounds(0, 0, 400, 400)
      .setOrigin(0.5, 0);

    this.close = this.add
      .image(760, 20, "close_icon")
      .setOrigin(0.5, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.onClose();
      });
  }

  displayCustomerPriorities() {
    const priorities = intersperse(
      this.customer.priorities.map(getPriorityText),
      [" ", " ", " "]
    ).flat();
    this.priorityText.setText(priorities);
  }

  //update(time, delta) {}
}
