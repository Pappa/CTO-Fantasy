import { State } from "../State";

export class SprintState extends State {
  team;
  scene;
  constructor(machine, scene, team, customer, events) {
    super(machine);
    this.team = team;
    this.customer = customer;
    this.scene = scene;
    this.events = events;
  }

  enter() {
    this.scene.launch("SprintScene", {
      team: this.team,
      customer: this.customer,
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
