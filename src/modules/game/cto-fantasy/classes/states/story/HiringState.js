import { State } from "../State";

export class HiringState extends State {
  candidates;
  scene;
  constructor(fsm, scene, candidates) {
    super(fsm);
    this.candidates = candidates;
    this.scene = scene;
  }

  enter() {
    this.scene.launch("HiringScene", {
      candidates: this.candidates,
      onClose: () => {
        this.fsm.next();
      },
    });
  }

  exit() {
    this.scene.stop("HiringScene");
  }
}
