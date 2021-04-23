import { randomInt, randomName } from "../utils/random";
import { shuffle, unique } from "../utils/collection";

export class Customer {
  currentNumberOfPriorities = 2;
  constructor({ emitter, project }) {
    this.name = randomName();
    this.needForFeatures = randomInt(5, 7) / 10;
    this.acceptanceOfBugs = randomInt(5, 7) / 10;
    this.satisfaction = 0.5;
    this.priorities = [];
    this.emitter = emitter;
    this.project = project;

    this.createEvents();
  }

  update({
    team,
    averageVelocity,
    currentVelocity,
    existingBugs,
    bugsFixed,
    newBugs,
  }) {
    // TODO update satisfaction
  }

  updatePriorities() {
    this.priorities = shuffle(
      unique(this.project.productBacklog.map(({ feature }) => feature))
    ).slice(0, this.currentNumberOfPriorities);
    this.emitter.emit("customer_priorities_updated", this.priorities);
  }

  createEvents() {
    this.emitter.on("update_customer_priorities", () => {
      this.updatePriorities();
    });
  }
}
