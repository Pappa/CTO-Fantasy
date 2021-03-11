import Phaser from "phaser";
import * as theme from "../theme";
import { randomInt } from "../utils/random";

export class SprintScene extends Phaser.Scene {
  constructor() {
    super("SprintScene");
  }

  init() {}

  preload() {}

  create({ team, events = [], onClose }) {
    this.team = team;
    this.events = events;
    this.onClose = onClose;
    this.updateSprintNumber();
    this.createComponents();
  }

  update(time, delta) {
    if (!this.events.length) {
      //this.onClose();
    }
  }

  updateSprintNumber() {
    this.sprintNumber = this.registry.inc("sprintNumber").get("sprintNumber");
    console.log("this.sprintNumber", this.sprintNumber);
  }

  createComponents() {
    this.header = this.add
      .text(400, 15, `Sprint ${this.sprintNumber}`, theme.h1)
      .setOrigin(0.5, 0);
    this.eventCard = this.add
      .dom(400, 300)
      .createFromCache("event")
      .setOrigin(0.5);
    /*.setVisible(false)*/
  }

  createEvents() {
    this.events = Array(randomInt(1, 3))
      .fill(null)
      .map(() => ({
        text: "Do you want to do A or B?",
        A: () => {},
        B: () => {},
      }));
  }

  displayEvent(event) {
    this.eventCard.getChildByID("description").textContent = event.text;
  }
}
