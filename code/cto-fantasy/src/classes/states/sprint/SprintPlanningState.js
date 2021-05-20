import { State } from "../State";

export class SprintPlanningState extends State {
  constructor(machine, scene, data) {
    super(machine, scene);
    this.data = data;
  }

  enter() {
    this.scene.launch("ProductBacklogScene", this.data);
  }

  exit() {
    this.scene.stop("ProductBacklogScene");
  }
}
