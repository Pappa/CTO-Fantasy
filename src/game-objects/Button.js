import Phaser from "phaser";
import * as theme from "../theme";
import { noop } from "../utils/function";

export class Button extends Phaser.GameObjects.Container {
  defaultWidth = 190;
  height = 49;
  constructor(
    scene,
    x = 0,
    y = 0,
    width = 190,
    { text, callback } = { text: "", callback: noop }
  ) {
    super(scene, x, y);
    this.width = width;
    this.callback = callback;
    this.scene.add.existing(this);

    this.setSize(this.width, this.height);
    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(0, 0, this.width, this.height),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      useHandCursor: true,
      draggable: false,
    });

    this.on("pointerdown", () => {
      this.callback();
    });

    const buttonXScale = this.width / this.defaultWidth;

    this.background = this.scene.add
      .image(0, 0, "button")
      .setScale(buttonXScale, 1);
    this.text = this.scene.add
      .text(0, 0, text, theme.buttonText)
      .setOrigin(0.5);
    this.add([this.background, this.text]);
  }

  update({ text, callback }) {
    if (text || text === "") {
      this.text.setText(text);
    }
    if (callback) {
      this.callback = callback;
    }
  }

  deactivate() {
    this.disableInteractive();
  }

  activate() {
    this.setInteractive();
  }

  show() {
    this.setVisible(true);
  }

  hide() {
    this.setVisible(false);
  }
}
