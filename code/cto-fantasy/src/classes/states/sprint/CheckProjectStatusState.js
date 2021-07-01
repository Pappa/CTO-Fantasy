import { State } from "../State";

export class CheckProjectStatusState extends State {
  delay = 0;
  constructor(machine, scene, { team, customer, project, emitter }) {
    super(machine, scene);
    this.team = team;
    this.customer = customer;
    this.project = project;
    this.emitter = emitter;
  }

  enter() {
    if (this.project.isComplete()) {
      this.machine.clearQueue();
      this.scene.launch("EndScene", {
        team: this.team,
        customer: this.customer,
        project: this.project,
        emitter: this.emitter,
      });
    } else {
      this.machine.next();
    }
  }

  exit() {}
}
