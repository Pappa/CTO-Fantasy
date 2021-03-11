import { State } from "../State";

export class SprintState extends State {
  team;
  scene;
  constructor(fsm, scene, team, events) {
    super(fsm);
    this.team = team;
    this.scene = scene;
    this.events = events;
  }

  enter() {
    this.scene.launch("SprintScene", {
      team: this.team,
      events: this.events,
      onClose: () => {
        this.fsm.next();
      },
    });
  }

  exit() {
    this.scene.stop("SprintScene");
  }
}
