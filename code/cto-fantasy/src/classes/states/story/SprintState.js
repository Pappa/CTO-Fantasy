import { State } from "../State";

export class SprintState extends State {
  constructor(machine, scene, data) {
    super(machine, scene);
    this.data = data;
  }

  enter() {
    this.scene.launch("SprintScene", this.data);
  }

  exit() {
    this.scene.stop("SprintScene");
  }
}
