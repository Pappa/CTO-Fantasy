export class Project {
  constructor({ name }) {
    this.projectName = name || "Project Genesis";
    this.numberOfBugs = 0;
    this.testCoverage = 0;
  }
}
