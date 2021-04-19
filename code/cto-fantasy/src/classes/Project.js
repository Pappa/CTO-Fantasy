import { randomInt } from "../utils/random";
import { generateProductFeatures } from "../utils/features";

export class Project {
  constructor({
    name = "Project Genesis",
    storyPointValues = [1, 2, 3, 5, 8, 13, 20],
    budget,
    emitter,
  }) {
    this.name = name;
    this.storyPointValues = storyPointValues;
    this.budget = budget || randomInt(50000, 100000);
    this.emitter = emitter;
    const { initial, rest } = generateProductFeatures();
    this.backlog = initial;
    this.potentialWorkItems = rest;
    this.numberOfBugs = 0;
    this.testCoverage = 0;

    this.createEvents();
  }

  createEvents() {
    this.emitter.on("estimate_updated", this.updateEstimate);
    this.emitter.on("update_backlog_order", this.updateBacklogOrder);
  }

  update({ bugs }) {
    this.numberOfBugs += bugs;
  }

  updateEstimate = (item, estimate) => {
    const workItem = this.backlog.find(({ id }) => item.id === id) || {};
    workItem.estimate = estimate;
  };

  updateBacklogOrder = (positions) => {
    const ordered = positions.map(({ id }) =>
      this.backlog.find((item) => item.id === id)
    );
    this.backlog = ordered;
  };

  get productBacklog() {
    return this.backlog;
  }
}
