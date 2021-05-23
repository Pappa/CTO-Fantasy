import { getBacklogEstimates } from "../../../utils/sprint";
import { State } from "../State";

export class RefinementState extends State {
  constructor(machine, scene, data) {
    super(machine, scene);
    this.data = data;
  }

  enter() {
    const estimates = getBacklogEstimates(
      this.data.project.stories,
      this.data.team,
      this.data.project.storyPointValues
    );
    this.data.emitter.emit("update_estimates", estimates);
    this.machine.next();
  }

  exit() {}
}
