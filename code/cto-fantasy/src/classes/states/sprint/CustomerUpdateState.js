import { State } from "../State";

export class CustomerUpdateState extends State {
  card;
  constructor(machine, scene, project, customer, emitter, onClose) {
    super(machine);
    this.scene = scene;
    this.project = project;
    this.customer = customer;
    this.emitter = emitter;
    this.onClose = onClose;
  }

  enter() {
    this.emitter.emit("update_customer_priorities");
    setTimeout(() => {
      this.onClose();
    }, 10);
  }

  exit() {}
}
