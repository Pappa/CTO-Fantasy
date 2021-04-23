import { State } from "./State";

export class NavigationState extends State {
  constructor(machine, scene, navigationScene, data) {
    super(machine, scene);
    this.data = data;
    this.navigationScene = navigationScene;
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
  data = {}
) =>
  new NavigationState(machine, scene, navigationScene, {
    ...initialData,
    ...data,
  });
