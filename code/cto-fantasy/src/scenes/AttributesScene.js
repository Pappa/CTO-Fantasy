import Phaser from "phaser";
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
    this.background = this.add
      .graphics()
      .fillStyle(0x222222, 1.0)
      .lineStyle(1, 0xffffff, 1.0)
      .fillRoundedRect(10, 10, width - 20, height - 20)
      .strokeRoundedRect(10, 10, width - 20, height - 20);

    this.header = this.add
      .text(400, 15, "Project Attributes", theme.h1)
      .setOrigin(0.5, 0);

    console.log("attrs: ", this.project.attributes.attributesList);

    this.attributesText = this.project.attributes.attributesList
      .filter(({ value }) => value > 0 || DEBUG)
      .map(({ category, attribute, name, value }, idx) => {
        console.log(
          name,
          value,
          DEBUG,
          value > 0 || DEBUG,
          50 + 20 * (idx + 1)
        );
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

    this.close = this.add
      .image(760, 20, "close_icon")
      .setOrigin(0.5, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.onClose();
      });
  }
}
