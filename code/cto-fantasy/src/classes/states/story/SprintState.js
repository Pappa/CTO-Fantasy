import { State } from "../State";

export class SprintState extends State {
  team;
  scene;
  constructor(machine, scene, team, customer, project, events) {
    super(machine);
    this.team = team;
    this.customer = customer;
    this.project = project;
    this.scene = scene;
    this.events = events;
  }

  enter() {
    this.scene.launch("SprintScene", {
      team: this.team,
      customer: this.customer,
      project: this.project,
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
