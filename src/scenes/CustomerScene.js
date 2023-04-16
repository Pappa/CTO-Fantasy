import Phaser from "phaser";
import { SceneBackground } from "../game-objects/SceneBackground";
import * as theme from "../theme";
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
    this.margin = 20;
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

    this.customerIcon = this.add
      .image(this.width / 2, 150, "customer_neutral")
      .setScale(0.2)
      .setOrigin(0.5);

    this.priorityText = this.add
      .text(this.centreX, 250, "", {
        ...theme.mainText,
        wordWrap: {
          width: this.width - this.margin * 2,
          useAdvancedWrap: false,
        },
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
    const priorities = this.customer.priorities
      .map(getPriorityText)
      .join("\n\n");
    this.priorityText.setText(priorities);
  }
}
