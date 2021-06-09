import Phaser from "phaser";
import { SceneBackground } from "../game-objects/SceneBackground";
import { Progress } from "../game-objects/Progress";
import * as theme from "../theme";

const DEBUG = process.env.REACT_APP_DEBUG === "on";

export class AttributesScene extends Phaser.Scene {
  constructor() {
    super("AttributesScene");
  }

  init() {}

  preload() {}

  create({ customer, project, emitter, onClose }) {
    this.customer = customer;
    this.project = project;
    this.emitter = emitter;
    this.onClose = onClose;
    this.createComponents();
  }

  createComponents() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.background = new SceneBackground(this, 0, 0, width, height, {
      title: "Software Development Practices",
      closeIcon: "close_icon",
      onClose: () => {
        this.onClose();
      },
    });

    this.attributes = this.project.attributes.attributesList
      .filter(
        ({ attribute, value }) =>
          DEBUG || value > 0 || this.project.team.hasDiscovered(attribute)
      )
      .map(({ category, attribute, name, value }, idx) => {
        return [
          this.make
            .text({
              x: 235,
              y: 75 + 20 * (idx + 1),
              text: `${name}`,
              style:
                value === 0 && DEBUG
                  ? theme.attributeTextDebug
                  : theme.attributeText,
            })
            .setVisible(value > 0 || DEBUG)
            .setOrigin(0),
          new Progress(this, 465, 75 + 20 * (idx + 1), {
            progress: value * 100,
          }),
        ].flat();
      });
  }
}
