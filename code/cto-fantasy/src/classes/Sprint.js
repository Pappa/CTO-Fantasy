import { calculateNewSprintBugs } from "../utils/sprint";

export class Sprint {
  SPRINT_LENGTH = 10;
  constructor({ number, project, registry, emitter }) {
    console.log(project);
    this.number = number;
    this.project = project;
    this.team = this.project.team;
    this.customer = this.project.customer;
    this.registry = registry;
    this.emitter = emitter;
    this.commitment = this.team.getCommitment();
  }

  getVelocity() {
    return Math.floor(this.team.skill * this.team.size * this.SPRINT_LENGTH);
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
}
