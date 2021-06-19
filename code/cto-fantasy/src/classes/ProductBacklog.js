import { generateProductFeatures } from "../utils/features";
import { Bug, UserStory, WorkItem } from "./WorkItem";
import { shuffle } from "../utils/collection";

export class ProductBacklog {
  constructor({
    storyPointValues = [1, 2, 3, 5, 8, 13, 20],
    newStoriesPerSprint = 4,
    emitter,
    featureGenerator = generateProductFeatures,
  }) {
    this.storyPointValues = storyPointValues;
    this.newStoriesPerSprint = newStoriesPerSprint;
    this.emitter = emitter;
    const { initial, rest } = featureGenerator(storyPointValues);
    this.backlog = initial;
    this.potentialWorkItems = rest;

    this.createEvents();
  }

  createEvents() {
    this.emitter.on("update_estimate", this.updateEstimate);
    this.emitter.on("update_estimates", this.updateEstimates);
    this.emitter.on("update_backlog_order", this.updateBacklogOrder);
    this.emitter.on("sprint_ended", this.updateBacklogOnSprintEnd);
    this.emitter.on("create_more_stories", this.addMoreStoriesToBacklog);
  }

  updateEstimate = (item, estimate) => {
    const workItem = this.backlog.find(({ id }) => item.id === id) || {};
    workItem.estimate = estimate;
    this.emitter.emit("backlog_updated");
  };

  updateEstimates = (items) => {
    items.forEach((item) => {
      const workItem = this.backlog.find(({ id }) => item.id === id) || {};
      workItem.estimate = item.estimate;
    });
    this.emitter.emit("backlog_updated");
  };

  updateBacklogOrder = (positions) => {
    const ordered = positions.map(({ id }) =>
      this.backlog.find((item) => item.id === id)
    );
    this.backlog = ordered;
    this.emitter.emit("backlog_updated");
  };

  updateBacklogOnSprintEnd = ({ sprintBacklog }) => {
    sprintBacklog.forEach((item) => {
      if (!this.backlog.includes(item)) {
        this.backlog.push(item);
      }
    });
  };

  addMoreStoriesToBacklog = () => {
    const storiesToAdd = shuffle(this.potentialWorkItems).slice(
      0,
      this.newStoriesPerSprint
    );
    storiesToAdd.forEach((item) => {
      item.status = WorkItem.STATUS.TODO;
    });
    this.backlog.push(...storiesToAdd);
    this.potentialWorkItems = this.potentialWorkItems.filter(
      (item) => !storiesToAdd.includes(item)
    );
  };

  get items() {
    return this.backlog.filter((item) => !item.done() && item.visible());
  }

  get completed() {
    return this.backlog.filter((item) => item.done());
  }

  get bugs() {
    return this.items.filter((item) => item instanceof Bug);
  }

  get stories() {
    return this.items.filter((item) => item instanceof UserStory);
  }
}
