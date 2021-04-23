import { State } from "../State";

export class SprintEventState extends State {
  constructor(machine, scene, data) {
    super(machine, scene);
    this.data = data;
  }

  enter() {
    this.scene.launch("SprintEventScene", this.data);
  }

  exit() {
    this.scene.stop("SprintEventScene");
  }
}
