import { State } from "../State";

export class SprintPlanningState extends State {
  card;
  constructor(machine, scene, project, commitment, onClose) {
    super(machine);
    this.scene = scene;
    this.project = project;
    this.commitment = commitment;
    this.onClose = onClose;
  }

  enter() {
    this.scene.launch("SprintPlanningScene", {
      project: this.project,
      commitment: this.commitment,
      onClose: () => {
        this.onClose();
      },
    });
  }

  exit() {
    this.scene.stop("SprintPlanningScene");
  }
}
