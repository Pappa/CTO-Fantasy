import Phaser from "phaser";
import { SceneBackground } from "../game-objects/SceneBackground";
import * as theme from "../theme";

export class RetrospectiveScene extends Phaser.Scene {
  constructor() {
    super("RetrospectiveScene");
  }

  init() {}

  preload() {}

  create({ team, project, actions, onClose }) {
    this.team = team;
    this.project = project;
    this.actions = actions;
    this.onClose = onClose;
    this.createComponents();
    this.displayActions();
  }

  createComponents() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.background = new SceneBackground(this, 0, 0, width, height, {
      title: "Sprint Restrospective",
      closeIcon: "close_icon",
      onClose: () => {
        this.onClose();
      },
    });
  }

  displayActions() {
    const actionsString = this.actions
      .map(({ name }) => name)
      .reduce((acc, item, idx, self) => {
        return idx === 0
          ? item
          : idx < self.length - 1
          ? (acc += `, ${item}`)
          : (acc += ` and ${item}`);
      }, "");
    this.make
      .text({
        x: 150,
        y: 150,
        text: `The team discussed ${actionsString}, and have decided to try to make improvements in these areas next sprint.`,
        style: {
          ...theme.mainText,
          align: "left",
          wordWrap: { width: 500, useAdvancedWrap: true },
        },
      })
      .setOrigin(0);
  }
}
