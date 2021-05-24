import { randomInt, randomName } from "../utils/random";
import { shuffle, unique } from "../utils/collection";
import { findBugs } from "../utils/sprint";
import { Bug, UserStory } from "./WorkItem";

export class Customer {
  currentNumberOfPriorities = 2;
  constructor({ emitter, project }) {
    this.name = randomName();
    this.needForFeatures = randomInt(5, 7) / 10;
    this.acceptanceOfBugs = randomInt(5, 7) / 10;
    this.satisfaction = {
      features: {},
      bugsInBacklog: {},
    };
    this.priorities = [];
    this.emitter = emitter;
    this.project = project;

    this.createEvents();
  }

  update({ commitment, velocity, success, sprintBugs, sprintBacklog }) {
    findBugs(sprintBugs, this.acceptanceOfBugs);

    const featuresCompleted = unique(
      sprintBacklog
        .filter((item) => item instanceof UserStory && item.done())
        .map(({ feature }) => feature)
        .filter((feature) => this.priorities.includes(feature))
    );
    const featuresNotCompleted = unique(
      sprintBacklog
        .filter((item) => item instanceof UserStory && !item.done())
        .map(({ feature }) => feature)
        .filter((feature) => this.priorities.includes(feature))
    );
    const newBugs = sprintBugs.filter(
      (item) => item instanceof Bug && item.visible()
    );
    const featuresWithNewBugs = unique(
      newBugs
        .map(({ feature }) => feature)
        .filter((feature) => this.priorities.includes(feature))
    );

    const storiesNotDone = this.project.stories.length;
    const bugsNotDone = this.project.bugs.length;
    const bugsToStoriesRatio = bugsNotDone / storiesNotDone;

    console.log("customer.priorities", this.priorities);
    console.log("featuresCompleted", featuresCompleted);
    console.log("featuresNotCompleted", featuresNotCompleted);
    console.log("featuresWithNewBugs", featuresWithNewBugs);
    console.log("storiesNotDone", storiesNotDone);
    console.log("bugsNotDone", bugsNotDone);
    console.log("bugsToStoriesRatio", bugsToStoriesRatio);
    // TODO update satisfaction

    const featuresScore = featuresCompleted.length / this.priorities.length;

    this.satisfaction.features = {
      complete: featuresCompleted,
      incomplete: featuresNotCompleted,
      bugs: featuresWithNewBugs,
      score: featuresScore,
    };

    this.satisfaction.bugs =
      !bugsNotDone || this.acceptanceOfBugs > bugsToStoriesRatio;
  }

  updatePriorities() {
    this.priorities = shuffle(
      unique(this.project.productBacklog.map(({ feature }) => feature))
    ).slice(0, this.currentNumberOfPriorities);
    this.emitter.emit("customer_priorities_updated", this.priorities);
  }

  createEvents() {
    this.emitter.on("update_customer_priorities", this.updatePriorities, this);
  }
}
