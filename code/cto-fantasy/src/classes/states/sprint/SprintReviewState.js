import { State } from "../State";

export class SprintReviewState extends State {
  card;
  constructor(machine, scene, results, onClose) {
    super(machine);
    this.scene = scene;
    this.results = results;
    this.onClose = onClose;
  }

  enter() {
    this.scene.launch("SprintReviewScene", {
      results: this.results,
      onClose: () => {
        this.onClose();
      },
    });
  }

  exit() {
    this.scene.stop("SprintReviewScene");
  }
}
