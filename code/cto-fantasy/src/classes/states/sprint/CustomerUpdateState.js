import { State } from "../State";

export class CustomerUpdateState extends State {
  constructor(machine, scene, data) {
    super(machine, scene);
    this.data = data;
  }

  enter() {
    this.data.emitter.emit("update_customer_priorities");
    setTimeout(() => {
      this.data.onClose();
    }, 10);
  }

  exit() {}
}
