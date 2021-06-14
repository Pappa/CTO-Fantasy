import Phaser from "phaser";
import { SceneBackground } from "../game-objects/SceneBackground";
import { Progress } from "../game-objects/Progress";
import * as theme from "../theme";
import { Dialogue } from "../game-objects/Dialogue";
import { PROJECT_ATTRIBUTES_TEXT } from "../utils/project";

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
      .map(({ category, attribute, value }, idx) => {
        const y = 75 + 20 * (idx + 1);
        return [
          this.make
            .text({
              x: 235,
              y,
              text: `${PROJECT_ATTRIBUTES_TEXT[attribute].name}`,
              style:
                value === 0 && DEBUG
                  ? theme.attributeTextDebug
                  : theme.attributeText,
            })
            .setVisible(value > 0 || DEBUG)
            .setOrigin(0),
          new Progress(this, 465, y, {
            progress: value * 100,
          }),
          this.make
            .image({
              x: 580,
              y,
              key: "information_icon",
              scale: {
                x: 0.25,
                y: 0.25,
              },
            })
            .setOrigin(0)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
              this.showInfo(attribute);
            }),
        ].flat();
      });
    this.info = new Dialogue(
      this,
      200,
      200,
      width - 400,
      height - 400,
      {}
    ).hide();
  }

  showInfo(attribute) {
    this.info.updateComponents({
      title: PROJECT_ATTRIBUTES_TEXT[attribute].name,
      text: PROJECT_ATTRIBUTES_TEXT[attribute].description,
      onAccept: () => {
        this.info.hide();
      },
    });
    this.info.show();
  }
}
