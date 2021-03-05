import Phaser from "phaser";
import * as theme from "../theme";

export class Button extends Phaser.GameObjects.Container {
  constructor(scene, x = 0, y = 0, content, callback) {
    super(scene, x, y);

    this.button = this.scene.add.image(0, 0, "button");
    this.button
      .setScale(0.5)
      .setOrigin(0.5, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", this.updateButton.bind(this, "button_hover"))
      .on("pointerdown", this.updateButton.bind(this, "button_click"))
      .on("pointerout", this.updateButton.bind(this, "button"))
      .on("pointerup", callback);
    this.buttonText = this.scene.add
      .text(0, 5, content.buttonText, theme.buttonText)
      .setOrigin(0.5, 0);
    this.add([this.button, this.buttonText]);
  }

  updateButton = (texture) => {
    this.button.setTexture(texture);
  };
}
