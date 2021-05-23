import { UserStory } from "./WorkItem";
import { workOnSprintBacklogItems } from "../utils/sprint";
import { sum } from "../utils/number";

export class Sprint {
  SPRINT_LENGTH = 10;
  constructor({ number, project, registry, emitter }) {
    this.number = number;
    this.project = project;
    this.team = this.project.team;
    this.customer = this.project.customer;
    this.registry = registry;
    this.emitter = emitter;
    this.commitment = this.team.getCommitment();

    this.createEvents();
  }

  getVelocity() {
    return sum(
      this.sprintBacklog
        .filter((item) => item instanceof UserStory && item.done())
        .map(({ estimate }) => estimate)
    );
  }

  getResults() {
    const velocity = this.getVelocity();
    return {
      commitment: this.commitment,
      velocity,
      success: Number.parseFloat((velocity / this.commitment).toFixed(2)),
      sprintBugs: this.sprintBugs,
      sprintBacklog: this.sprintBacklog,
    };
  }

  // should this be called one day at a time?
  workOnItems() {
    const { backlog, bugs } = workOnSprintBacklogItems(
      this.sprintBacklog,
      this.sprintBugs,
      this.team,
      [], // TODO: distractions
      this.project.storyPointValues
    );

    this.sprintBacklog = backlog;
    this.sprintBugs = bugs;
  }

  createEvents() {
    this.emitter.on("sprint_backlog_selected", (items) => {
      this.sprintBacklog = items;
      this.sprintBugs = [];
    });
  }
}
