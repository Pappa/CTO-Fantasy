import { State } from "../State";

export class SprintState extends State {
  team;
  scene;
  constructor(machine, scene, team, events) {
    super(machine);
    this.team = team;
    this.scene = scene;
    this.events = events;
  }

  enter() {
    this.scene.launch("SprintScene", {
      team: this.team,
      events: this.events,
      onClose: () => {
        this.machine.next();
      },
    });
  }

  exit() {
    this.scene.stop("SprintScene");
  }
}
