import {
  getBacklogEstimates,
  getNumberOfStoriesToEstimate,
} from "../../../utils/sprint";
import { State } from "../State";

export class RefinementState extends State {
  delay = 0;
  constructor(machine, scene, { project, team, emitter }) {
    super(machine, scene);
    this.project = project;
    this.team = team;
    this.emitter = emitter;
  }

  enter() {
    if (!!this.team.productOwner) {
      // automatically prioritise customer priorities if the team has a PO
      this.project.backlog.prioritise(this.project.customer.priorities);
    }
    const itemsToRefine = getNumberOfStoriesToEstimate(
      this.team,
      this.project.attributes.attributes
    );
    const estimates = getBacklogEstimates(
      this.project.backlog.stories,
      this.team,
      this.project.backlog.storyPointValues,
      itemsToRefine
    );
    this.emitter.emit("update_estimates", estimates);
    this.machine.next();
  }

  exit() {}
}
