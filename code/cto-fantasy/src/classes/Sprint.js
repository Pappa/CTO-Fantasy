import { calculateNewSprintBugs } from "../utils/sprint";

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

    // TODO: take into account firefighting events
    // and other distractions, such as training
    this.workOnItems();
  }

  getVelocity() {
    return Math.floor(
      this.team.skill * ((this.team.size * this.SPRINT_LENGTH) / 2)
    );
  }

  getResults() {
    const velocity = this.getVelocity();
    return {
      commitment: this.commitment,
      velocity,
      success: Number.parseFloat((velocity / this.commitment).toFixed(2)),
      bugs: this.getBugs(),
      customerSatisfaction: this.project.customer.satisfaction,
    };
  }

  getBugs() {
    const BUGINESS_RATIO = this.registry.get("settings").BUGINESS_RATIO;
    return calculateNewSprintBugs(this.team, BUGINESS_RATIO);
  }

  // should this be called one day at a time?
  workOnItems() {
    console.log("this.team", this.team);

    // how well do the team focus on completion before starting new work?
    // team.flow

    // how well do the team work together
    // team.collboration

    // how capable are the team
    // team.skill & team.experience
  }

  createEvents() {
    this.emitter.on("sprint_backlog_selected", (items) => {
      this.sprintBacklog = items;
      console.log("this.sprintBacklog", this.sprintBacklog);
    });
  }
}
