import { randomInt, randomName } from "../utils/random";
import { shuffle, unique } from "../utils/collection";
import { findBugs, partitionFeaturesByStoryCompletion } from "../utils/sprint";
import { UserStory } from "./WorkItem";

export class Customer {
  currentNumberOfPriorities = 2;
  constructor({ emitter, project }) {
    this.name = randomName();
    this.needForFeatures = randomInt(5, 7) / 10;
    this.qualityMindset = randomInt(5, 7) / 10;
    this.agileMindset = randomInt(3, 6) / 10;
    this.satisfaction = {
      features: {},
      bugs: {},
    };
    this.priorities = [];
    this.emitter = emitter;
    this.project = project;

    this.createEvents();
  }

  update({ commitment, velocity, success, sprintBugs, sprintBacklog }) {
    findBugs(sprintBugs, this.qualityMindset);

    const stories = sprintBacklog.filter((item) => item instanceof UserStory);

    const {
      featuresCompleted,
      featuresNotCompleted,
    } = partitionFeaturesByStoryCompletion(stories, this.priorities);

    const newBugs = sprintBugs.filter((item) => item.visible());

    const featuresWithNewBugs = unique(
      newBugs.map(({ feature }) => feature)
    ).filter((feature) => this.priorities.includes(feature));

    const storiesNotDone = this.project.backlog.stories.length;
    const bugsNotDone = this.project.backlog.bugs.length;
    const bugsToStoriesRatio = bugsNotDone / (storiesNotDone || 1);
    const featuresScore = featuresCompleted.length / this.priorities.length;

    const satisfiedWithBugs =
      !bugsNotDone || this.qualityMindset > bugsToStoriesRatio;

    const maxScore = this.priorities.length + 1;
    const overallScore = featuresCompleted.length + (satisfiedWithBugs ? 1 : 0);
    const overallSatisfaction = overallScore / maxScore;

    this.satisfaction.features = {
      complete: featuresCompleted,
      incomplete: featuresNotCompleted,
      buggy: featuresWithNewBugs,
      score: featuresScore,
    };

    this.satisfaction.bugs = satisfiedWithBugs;
    this.satisfaction.overall =
      overallSatisfaction < 0.34
        ? "dissatisfied"
        : overallSatisfaction > 0.65
        ? "satisfied"
        : "neutral";
  }

  updatePriorities() {
    this.priorities = shuffle(
      unique(this.project.backlog.items.map(({ feature }) => feature))
    ).slice(0, this.currentNumberOfPriorities);
    this.emitter.emit("customer_priorities_updated", this.priorities);
  }

  createEvents() {
    this.emitter.on("update_customer_priorities", this.updatePriorities, this);
  }
}
