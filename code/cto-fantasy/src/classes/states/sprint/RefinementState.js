import { getBacklogEstimates } from "../../../utils/sprint";
import { State } from "../State";

export class RefinementState extends State {
  constructor(machine, scene, { project, team, emitter }) {
    super(machine, scene);
    this.project = project;
    this.team = team;
    this.emitter = emitter;
  }

  enter() {
    const estimates = getBacklogEstimates(
      this.project.backlog.stories,
      this.team,
      this.project.backlog.storyPointValues
    );
    this.emitter.emit("update_estimates", estimates);
    this.machine.next();
  }

  exit() {}
}
