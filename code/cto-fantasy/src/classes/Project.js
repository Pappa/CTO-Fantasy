import { randomInt } from "../utils/random";

export class Project {
  constructor({ name } = {}) {
    this.projectName = name || "Project Genesis";
    this.budget = randomInt(50000, 100000);
    this.backlog = [];
    this.numberOfBugs = 0;
    this.testCoverage = 0;
  }
}
