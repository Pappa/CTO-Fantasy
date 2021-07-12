import { State } from "./State";

export class ClickToContinueState extends State {
  delay = 0;
  constructor(machine, scene, button, data) {
    super(machine, scene);
    this.button = button;
    this.data = data;
  }

  enter() {
    this.button.update({
      text: this.data.text,
      callback: () => {
        this.machine.next();
      },
    });
    this.button.activate();
    this.button.show();
    this.scene.scene.input.keyboard.on("keydown", this.handleKey, this);
  }

  exit() {
    this.button.hide();
    this.scene.scene.input.keyboard.off("keydown", this.handleKey, this);
  }

  handleKey(event) {
    if (event.key === "Enter") {
      this.machine.next();
    }
  }
}

export const clickToContinueStateFactory = (
  machine,
  scene,
  button,
  initialData = {}
) => (data = {}) =>
  new ClickToContinueState(machine, scene, button, {
    ...initialData,
    ...data,
  });
