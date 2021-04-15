import { randomInt } from "../utils/random";
import { generateProductFeatures } from "../utils/features";

export class Project {
  constructor({ name } = {}) {
    this.name = name || "Project Genesis";
    this.budget = randomInt(50000, 100000);
    const { initial, rest } = generateProductFeatures();
    this.backlog = initial;
    this.potentialWorkItems = rest;
    this.numberOfBugs = 0;
    this.testCoverage = 0;
  }

  update({ bugs }) {
    this.numberOfBugs += bugs;
  }

  updateBacklogOrder(positions) {
    console.log("positions", positions);
    console.log("this.backlog", this.backlog);
    const ordered = positions.map(({ id }) =>
      this.backlog.find((item) => item.id === id)
    );
    this.backlog = ordered;
    console.log("this.backlog", this.backlog);
  }

  get productBacklog() {
    return this.backlog;
  }
}
