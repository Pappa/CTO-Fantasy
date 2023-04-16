export class State {
  machine;
  scene;

  constructor(machine, scene) {
    this.machine = machine;
    this.scene = scene;
  }
  enter() {}

  exit() {}
}
