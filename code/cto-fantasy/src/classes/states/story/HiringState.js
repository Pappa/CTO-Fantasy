import { State } from "../State";

export class HiringState extends State {
  scene;
  constructor(machine, scene) {
    super(machine);
    this.scene = scene;
  }

  enter() {
    this.scene.launch("HiringScene", {
      onClose: () => {
        this.machine.next();
      },
    });
  }

  exit() {
    this.scene.stop("HiringScene");
  }
}
