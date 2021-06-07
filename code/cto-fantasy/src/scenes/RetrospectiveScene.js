import Phaser from "phaser";
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
    this.background = this.add
      .graphics()
      .fillStyle(0x222222, 1.0)
      .lineStyle(1, 0xffffff, 1.0)
      .fillRoundedRect(10, 10, width - 20, height - 20)
      .strokeRoundedRect(10, 10, width - 20, height - 20);

    this.header = this.add
      .text(400, 15, "Sprint Restrospective", theme.h1)
      .setOrigin(0.5, 0);
    this.close = this.add
      .image(760, 20, "close_icon")
      .setOrigin(0.5, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.onClose();
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
