import { randomInt, randomName } from "../utils/random";

export class Customer {
  constructor() {
    this.gender = Math.random() <= 0.5 ? Customer.MALE : Customer.FEMALE;
    this.name = randomName(this.gender);
    this.needForFeatures = randomInt(5, 7) / 10;
    this.acceptanceOfBugs = randomInt(5, 7) / 10;
    this.satisfaction = 0.5;
    // TODO need to think this through,
    /// but generate something randomly from a full list of features like:
    this.priorities = ["Login", "Purchase API", "Order history feature"];
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
}

Customer.MALE = 0;
Customer.FEMALE = 1;
