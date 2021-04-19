import { State } from "../State";

export class SprintPlanningState extends State {
  card;
  constructor(machine, scene, project, team, commitment, emitter, onClose) {
    super(machine);
    this.scene = scene;
    this.project = project;
    this.team = team;
    this.commitment = commitment;
    this.emitter = emitter;
    this.onClose = onClose;
  }

  enter() {
    this.scene.launch("SprintPlanningScene", {
      project: this.project,
      team: this.team,
      commitment: this.commitment,
      emitter: this.emitter,
      onClose: () => {
        this.onClose();
      },
    });
  }

  exit() {
    this.scene.stop("SprintPlanningScene");
  }
}
