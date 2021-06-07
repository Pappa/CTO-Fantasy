import Phaser from "phaser";
import { SceneBackground } from "../game-objects/SceneBackground";
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
      title: "Project Attributes",
      closeIcon: "close_icon",
      onClose: () => {
        this.onClose();
      },
    });

    this.attributesText = this.project.attributes.attributesList
      .filter(({ value }) => value > 0 || DEBUG)
      .map(({ category, attribute, name, value }, idx) => {
        return this.make
          .text({
            x: 150,
            y: 75 + 18 * (idx + 1),
            text: `${name}: ${value * 100}%`,
            style:
              value === 0 && DEBUG
                ? theme.attributeTextDebug
                : theme.attributeText,
          })
          .setVisible(value > 0 || DEBUG)
          .setOrigin(0);
      });
  }
}
