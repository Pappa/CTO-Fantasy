import { randomInt, randomName } from "../utils/random";
import { shuffle, unique } from "../utils/collection";

export class Customer {
  constructor({ emitter, project }) {
    this.gender = Math.random() <= 0.5 ? Customer.MALE : Customer.FEMALE;
    this.name = randomName(this.gender);
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
    ).slice(0, 2);
    this.emitter.emit("customer_priorities_updated", this.priorities);
  }

  createEvents() {
    this.emitter.on("update_customer_priorities", () => {
      this.updatePriorities();
    });
  }
}

Customer.MALE = 0;
Customer.FEMALE = 1;
