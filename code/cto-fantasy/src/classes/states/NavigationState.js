import { State } from "./State";

export class NavigationState extends State {
  constructor(machine, scene, navigationScene, data, delay = 1000) {
    super(machine, scene);
    this.data = data;
    this.navigationScene = navigationScene;
    this.delay = delay;
  }

  enter() {
    this.scene.launch(this.navigationScene, this.data);
  }

  exit() {
    this.scene.stop(this.navigationScene);
  }
}

export const navigationStateFactory = (machine, scene, initialData = {}) => (
  navigationScene,
  data = {},
  delay
) =>
  new NavigationState(
    machine,
    scene,
    navigationScene,
    {
      ...initialData,
      ...data,
    },
    delay
  );
