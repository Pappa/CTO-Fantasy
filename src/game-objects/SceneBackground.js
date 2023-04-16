import Phaser from "phaser";
import * as theme from "../theme";

export class SceneBackground extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x = 0,
    y = 0,
    width,
    height,
    { title, closeIcon, onClose }
  ) {
    super(scene, x, y);
    this.width = width;
    this.height = height;
    this.centreX = width / 2;
    this.centreY = height / 2;
    this.margin = 5;
    this.title = title;
    this.closeIcon = closeIcon;
    this.onClose = onClose;
    this.scene.add.existing(this);

    this.createComponents();
  }

  createComponents() {
    this.background = this.scene.add
      .graphics()
      .fillStyle(0x222222, 1.0)
      .lineStyle(1, 0xffffff, 1.0)
      .fillRoundedRect(
        this.margin,
        this.margin,
        this.width - this.margin * 2,
        this.height - this.margin * 2
      )
      .strokeRoundedRect(
        this.margin,
        this.margin,
        this.width - this.margin * 2,
        this.height - this.margin * 2
      );

    this.header = this.scene.add
      .text(this.centreX, 20, this.title || " ", {
        ...theme.h2,
        ...theme.center,
      })
      .setOrigin(0.5, 0);

    this.close = this.scene.add
      .image(this.width - 15, 15, this.closeIcon)
      .setOrigin(1, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.onClose();
      });

    this.add([this.background, this.header, this.close]);
  }
}
