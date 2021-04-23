import { State } from "../State";

export class SprintReviewState extends State {
  constructor(machine, scene, data) {
    super(machine, scene);
    this.data = data;
  }

  enter() {
    this.scene.launch("SprintReviewScene", this.data);
  }

  exit() {
    this.scene.stop("SprintReviewScene");
  }
}
