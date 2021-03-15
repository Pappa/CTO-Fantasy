import Phaser from "phaser";
import { Card } from "../game-objects/Card";
import { LinearStateMachine } from "../classes/states/LinearStateMachine";
import { SprintEventState } from "../classes/states/sprint/SprintEventState";
import { SprintPlanningState } from "../classes/states/sprint/SprintPlanningState";
import * as theme from "../theme";
import { average } from "../utils/number";
import { randomInt } from "../utils/random";
import { SprintResultsState } from "../classes/states/sprint/SprintResultsState";

const SPRINT_LENGTH = 10;

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
    this.setCommitment();
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
    this.results = this.add
      .dom(400, 300)
      .createFromCache("results")
      .setOrigin(0.5)
      .setVisible(false);
    this.card = this.add.existing(new Card(this, 400, 150)).setVisible(false);
  }

  createEvents() {
    this.machine = new LinearStateMachine();
    this.events = [
      new SprintPlanningState(
        this.machine,
        this.card,
        this.commitment,
        this.handleEvents
      ),
    ];
    const randomEvents = this.getRandomSprintEvents();
    this.events.push(...randomEvents);
    this.machine.add(this.events);
    this.machine.next();
  }

  handleEvents() {
    this.machine.next();
    // probably a setTimeout bug here
    // move to update() ?
    if (!this.machine.currentState) {
      const velocity = this.calculateVelocity();
      this.machine.add(
        new SprintResultsState(
          this.machine,
          this.results,
          { velocity, commitment: this.commitment },
          () => {
            console.log("SprintResultsState closed");
            this.onClose();
          }
        )
      );
      this.machine.next();
    }
  }

  getRandomSprintEvents() {
    return Array(randomInt(1, 3))
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
      .map((ev) => new SprintEventState(this.machine, this.eventDialog, ev));
  }

  setCommitment() {
    this.commitment = randomInt(30, 60);
  }

  calculateResults() {
    this.velocity = this.calculateVelocity();
  }

  calculateVelocity() {
    const skills = this.team.map((member) => member.skill);
    const av = average(skills);
    const velocity = Math.floor(av * this.team.length * SPRINT_LENGTH);
    return velocity;
  }
}
