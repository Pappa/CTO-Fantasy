import { randomInt } from "../utils/random";
import { generateProductFeatures } from "../utils/features";

export class Project {
  constructor({ name } = {}) {
    this.name = name || "Project Genesis";
    this.budget = randomInt(50000, 100000);
    this.backlog = generateProductFeatures();
    this.numberOfBugs = 0;
    this.testCoverage = 0;
  }
}
