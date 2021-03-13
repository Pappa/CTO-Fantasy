import { State } from "../State";

export class HiringState extends State {
  candidates;
  scene;
  constructor(machine, scene, candidates) {
    super(machine);
    this.candidates = candidates;
    this.scene = scene;
  }

  enter() {
    this.scene.launch("HiringScene", {
      candidates: this.candidates,
      onClose: () => {
        this.machine.next();
      },
    });
  }

  exit() {
    this.scene.stop("HiringScene");
  }
}
