import { getBacklogEstimates } from "../../../utils/sprint";
import { State } from "../State";

export class RefinementState extends State {
  constructor(machine, scene, data) {
    super(machine, scene);
    this.data = data;
    console.log("this.data", Object.keys(this.data));
  }

  enter() {
    console.log("this.data", Object.keys(this.data));
    const estimates = getBacklogEstimates(
      this.data.project.productBacklog,
      this.data.team,
      this.data.project.storyPointValues
    );
    this.data.emitter.emit("update_estimates", estimates);
    this.machine.next();
  }

  exit() {}
}
