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
      .fillRoundedRect(10, 10, this.width - 20, this.height - 20)
      .strokeRoundedRect(10, 10, this.width - 20, this.height - 20);

    this.header = this.scene.add
      .text(400, 15, this.title || " ", theme.h1)
      .setOrigin(0.5, 0);

    this.close = this.scene.add
      .image(760, 20, this.closeIcon)
      .setOrigin(0.5, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.onClose();
      });

    this.add([this.background, this.header, this.close]);
  }
}
