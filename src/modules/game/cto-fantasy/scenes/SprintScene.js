import Phaser from "phaser";
import { LinearFSM } from "../classes/states/LinearFSM";
import { SprintEventState } from "../classes/states/sprint/SprintEventState";
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
    this.createEvents();
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
    this.eventDialog = this.add
      .dom(400, 300)
      .createFromCache("event")
      .setOrigin(0.5)
      .setVisible(false);
  }

  createEvents() {
    this.fsm = new LinearFSM();
    this.events = Array(randomInt(1, 3))
      .fill(null)
      .map(() => ({
        text: "Do you want to do A or B?",
        A: () => {
          this.handleEvents();
        },
        B: () => {
          this.handleEvents();
        },
      }))
      .map((ev) => new SprintEventState(this.fsm, this.eventDialog, ev));
    this.fsm.add(this.events);
    this.fsm.next();
  }

  handleEvents() {
    this.fsm.next();
    if (!this.fsm.currentState) {
      this.onClose();
    }
  }
}
